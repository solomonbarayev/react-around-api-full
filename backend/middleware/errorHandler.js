// const errorHandler = (err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   res.statusCode = statusCode;
//   res.status(statusCode).send({
//     message: statusCode === 500 ? 'A server error has occurred' : message,
//   });
//   next();
// };

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message =
    statusCode === 500 ? 'An error has occurred on the server' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
