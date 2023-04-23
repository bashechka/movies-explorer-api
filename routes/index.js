const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');
const { userValidator, signInValidator } = require('../validators/validators');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', signInValidator, login);
router.post('/signup', userValidator, createUser);

// авторизация
router.use(auth);

router.use(usersRouter);
router.use(moviesRouter);

router.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

module.exports = router;
