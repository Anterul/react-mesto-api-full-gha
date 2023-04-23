module.exports.errorHandler = (err, req, res, next) => {
  const errStatusCode = err.statusCode || 500;

  const errMessage = errStatusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  res.status(errStatusCode).send({ message: errMessage });
  next();
};
