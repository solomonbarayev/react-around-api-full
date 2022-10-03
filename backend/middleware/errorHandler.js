const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.statusCode = statusCode;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'A server error has occurred' : message,
    });
  next();
};

module.exports = errorHandler;
