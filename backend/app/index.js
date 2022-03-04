const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const accountRouter = require('./api/account');
const customerRouter = require('./api/customer');
const restaurantRouter = require('./api/restaurant');
const foodRouter = require('./api/food');


const app = express();

app.use(bodyParser.json())
app.use(cookieParser());

app.use('/account', accountRouter);
app.use('/customer', customerRouter);
app.use('/restaurant', restaurantRouter);
app.use('/food', foodRouter);



module.exports = app;