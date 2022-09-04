const Cards = require('../models/card');
const { BAD_REQUEST_ERROR, SERVER_ERROR } = require('../utils/errorCodes');

const { processCardWithId } = require('../utils/helpers');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ Error: `${err.message}` });
      } else {
        res.status(SERVER_ERROR).send({ Error: 'There was a server error' });
      }
    });
};

const deleteCard = (req, res) =>
  processCardWithId(req, res, Cards.findByIdAndRemove(req.params.cardId));

const updateLike = (req, res, method) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  processCardWithId(
    req,
    res,
    Cards.findByIdAndUpdate(cardId, { [method]: { likes: _id } }, { new: true })
  );
};

const likeCard = (req, res) => updateLike(req, res, '$addToSet');

const dislikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
