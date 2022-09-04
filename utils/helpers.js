const {
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  SERVER_ERROR,
} = require('./errorCodes');

const processCardWithId = (req, res, action) =>
  action
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(NOT_FOUND_ERROR).send({ Error: 'Card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ Error: 'Invalid card ID' });
      } else {
        res.status(SERVER_ERROR).send({ Error: 'There was a server error' });
      }
    });

const processUserWithId = (req, res, action) =>
  action
    .orFail(() => {
      const error = new Error('No user found with this Id');
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ Error: `${err.message}` });
      } else if (err.statusCode === NOT_FOUND_ERROR) {
        res.status(NOT_FOUND_ERROR).send({ Error: `${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ Error: 'An error has occurred' });
      }
    });

module.exports = { processCardWithId, processUserWithId };
