require('dotenv').config();
const Users = require('../models/user');
const { SERVER_ERROR } = require('../utils/errorCodes');
const { processUserWithId } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET;
const UnauthorizedError = require('../errors/Unauthorized-err');
const BadRequestError = require('../errors/BadRequest-err');
const ConflictError = require('../errors/Conflict-err');
const NotFoundError = require('../errors/NotFound-err');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  // first check if user exists
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        // user already exists
        throw new ConflictError('Email already exists');
      }
      // user does not exist, so spit out a hashed password
      return bcrypt.hash(password, 10);
    })
    // used hashed password to create user
    .then((hash) =>
      Users.create({ name, about, avatar, email, password: hash })
    )
    // send user back to client
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) =>
  Users.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);

const getCurrentUser = (req, res, next) => {
  // getUserData(req.user._id, res, next);
  processUserWithId(req, res, Users.findById(req.user._id), next);
};

const getUserId = (req, res, next) => {
  // getUserData(req.params.id, res, next);
  processUserWithId(req, res, Users.findById(req.params.id), next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  processUserWithId(
    req,
    res,
    Users.findByIdAndUpdate(
      _id,
      { name, about },
      { new: true, runValidators: true }
    ),
    next
  );
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  processUserWithId(
    req,
    res,
    Users.findByIdAndUpdate(
      _id,
      { avatar },
      { new: true, runValidators: true }
    ),
    next
  );
};

module.exports = {
  getUsers,
  getUserId,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
