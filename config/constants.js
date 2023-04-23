const MONGO_URL_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET_DEV = 'dev-secret';

const INVALID_DATA_MSG = 'Переданы некорректные данные';
const FORBIDDEN_MSG = 'Доступ запрещен';
const MOVIE_NOT_FOUND_MSG = 'Фильм с указанным _id не найдена';
const USER_ALREADY_EXISTS_MSG = 'Пользователь с таким email уже существует';
const USER_NOT_FOUND_MSG = 'Запрашиваемый пользователь не найден';

module.exports = {
  MONGO_URL_DEV,
  JWT_SECRET_DEV,
  INVALID_DATA_MSG,
  FORBIDDEN_MSG,
  MOVIE_NOT_FOUND_MSG,
  USER_ALREADY_EXISTS_MSG,
  USER_NOT_FOUND_MSG,
};
