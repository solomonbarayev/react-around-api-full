const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const nonRoute = require('./routes/nonRoute');

const app = express();

const { PORT } = process.env || 3000;

mongoose.connect(process.env.MONGODB_URI);

app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '6314818929850087281446bf' };
  next();
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.use('*', nonRoute);

app.listen(PORT);
