const { constants } = require('http2');

module.exports = (err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = status === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'Неизвестная ошибка' : err.message;
  res.status(status).send({ message });
  next();
};
