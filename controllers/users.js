const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const config = require('../config/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((data) => {
      const user = data.toObject();
      delete user.password;
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(config.USER_ALREADY_EXISTS_MSG));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(config.INVALID_DATA_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError(config.USER_NOT_FOUND_MSG));
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError(config.USER_NOT_FOUND_MSG));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(config.INVALID_DATA_MSG));
      } else if (err.code === 11000) {
        next(new ConflictError(config.USER_ALREADY_EXISTS_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const secret = req.app.get('secret');
      // создадим токен
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch(next);
};
