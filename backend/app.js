/* eslint-disable max-len */
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

logger.info('connecting to MongoDB');
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => logger.info('Connected to MongoDB'))
    .catch((error) => logger.error('Error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(middleware.requestLogger);

app.use('/', indexRouter);
app.use('/api', apiRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
