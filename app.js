require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/error');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();
const router = require('./routes/index');
const config = require('./config/constants');

const { PORT = 3000 } = process.env;
const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

const secret = NODE_ENV === 'production' ? JWT_SECRET : config.JWT_SECRET_DEV;
app.set('secret', secret);

mongoose.set({ runValidators: true });
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : config.MONGO_URL_DEV);

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов
app.use(errorLogger); // подключаем логгер ошибок
app.use(helmet());

app.use(rateLimiter);

app.use(cors());
app.options('*', cors());

app.use(router);

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
app.use(errorMiddleware);

// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
