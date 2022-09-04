const Users = require('../models/user');
const { SERVER_ERROR } = require('../utils/errorCodes');
const { processUserWithId } = require('../utils/helpers');

const getUsers = (req, res) =>
  Users.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(SERVER_ERROR).send(err));

const getUserId = (req, res) => {
  const { id } = req.params;
  processUserWithId(req, res, Users.findById(id));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Error' }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  processUserWithId(
    req,
    res,
    Users.findByIdAndUpdate(
      _id,
      { name, about },
      { new: true, runValidators: true, upsert: true }
    )
  );
};

const updateAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  processUserWithId(
    req,
    res,
    Users.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
  );
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateProfile,
  updateAvatar,
};
