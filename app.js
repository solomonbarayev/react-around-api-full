const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const nonRoute = require('./routes/nonRoute');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '63147c24c81b2ee206336e41' };
  next();
});

app.use('/users', usersRoute);
app.use('/', cardsRoute);
app.use('*', nonRoute);

app.listen(PORT);
