const Users = require('../models/user');

const getUsers = (req, res) =>
  Users.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));

const getUserId = (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .orFail(() => {
      const error = new Error('No user found with this Id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ Error: `${err.message}` });
      } else if (err.statusCode === 404) {
        res.status(404).send({ Error: `${err.message}` });
      } else {
        res.status(500).send({ Error: 'An error has occurred' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports = { getUsers, getUserId, createUser };
