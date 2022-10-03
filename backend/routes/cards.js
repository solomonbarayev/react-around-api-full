const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateObjectId,
  validateCardBody,
} = require('../middleware/validation');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:cardId', validateObjectId, deleteCard);
router.put('/:cardId/likes', validateObjectId, likeCard);
router.delete('/:cardId/likes', validateObjectId, dislikeCard);

module.exports = router;
