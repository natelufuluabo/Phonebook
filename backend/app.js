const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const loggerFunc = require('./utils/logger');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

dotenv.config();
app.use(cors());

const mongoose = require('mongoose');
const url = `${process.env.MONGODB_URI}`;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', apiRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'Endpoint does not exist.'});
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  loggerFunc.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;
