const express = require('express');
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { limiter } = require('./middleware/limiter');

const app = express();

const { PORT } = process.env || 3000;
const { MONGODB_URI = 'mongodb://localhost:27017/aroundb' } = process.env;

mongoose.connect(MONGODB_URI);

app.use(cors());
app.options('*', cors());

app.use(helmet());

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(router);

app.use(errorLogger);
// central error handler
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
