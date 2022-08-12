const express = require('express');
const path = require('path');
const helmet = require('helmet');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const nonRoute = require('./routes/nonRoute');

const app = express();

const { PORT = 3000 } = process.env;

app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRoute);
app.use('/', cardsRoute);
app.use('*', nonRoute);

app.listen(PORT);
