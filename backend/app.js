const express = require('express');
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const helmet = require('helmet');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const nonRoute = require('./routes/nonRoute');
const { createUser, login } = require('./controllers/users');
const {
  validateUserBody,
  validateAuthentication,
} = require('./middleware/validation');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();

const { PORT } = process.env || 3000;

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', validateUserBody, createUser);
app.post('/signin', validateAuthentication, login);

app.use(auth);

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.use('*', nonRoute);

app.use(errorLogger);
// central error handler
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
