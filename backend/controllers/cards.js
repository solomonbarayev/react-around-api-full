const NotFoundError = require('../errors/NotFound-err');
const ForbiddenError = require('../errors/Forbidden-err');
const Cards = require('../models/card');
const { BAD_REQUEST_ERROR, SERVER_ERROR } = require('../utils/errorCodes');

const { processCardWithId } = require('../utils/helpers');
const BadRequestError = require('../errors/BadRequest-err');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  console.log(req.user);
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Card not found');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('You are not authorized to delete this card'));
      } else {
        Cards.findByIdAndRemove(cardId).then((deletedCard) =>
          res.status(200).send(deletedCard)
        );
      }
    })
    .catch(next);
};

const updateLike = (req, res, next, method) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  processCardWithId(
    req,
    res,
    Cards.findByIdAndUpdate(
      cardId,
      { [method]: { likes: _id } },
      { new: true }
    ),
    next
  );
};

const likeCard = (req, res, next) => updateLike(req, res, next, '$addToSet');

const dislikeCard = (req, res, next) => updateLike(req, res, next, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
