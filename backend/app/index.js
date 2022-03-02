const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const accountRouter = require('./api/account')
const customerRouter = require('./api/customer')

const app = express();

app.use(bodyParser.json())
app.use(cookieParser());

app.use('/account', accountRouter);
app.use('/customer', customerRouter);

module.exports = app;