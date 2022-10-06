const router = require('express').Router();
const NotFoundError = require('../errors/NotFound-err');

router.use((req, res, next) => {
  next(new NotFoundError('The requested resource was not found'));
});

module.exports = router;
