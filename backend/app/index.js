const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const accountRouter = require('./api/account');
const customerRouter = require('./api/customer');
const restaurantRouter = require('./api/restaurant');
const foodRouter = require('./api/food');
const cartRouter = require('./api/cart')


const app = express();

app.use(cors({ origin: 'http://localhost:1234' }));
app.use(bodyParser.json())
app.use(cookieParser());

app.use('/account', accountRouter);
app.use('/customer', customerRouter);
app.use('/restaurant', restaurantRouter);
app.use('/food', foodRouter);
app.use('/cart', cartRouter);



module.exports = app;