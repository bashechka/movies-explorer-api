const { Joi, celebrate } = require('celebrate');

const validURL = /^https?:\/\/[www.]?[a-zA-Z0-9]+[\w\-._~:/?#[\]$&'()*+,;*]{2,}#?$/;

module.exports.movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(validURL),
    trailerLink: Joi.string().required().regex(validURL),
    thumbnail: Joi.string().required().regex(validURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.movieIdValidator = celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }).required(),
});

module.exports.userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.userUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports.signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
