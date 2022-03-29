const { Router } = require('express');
const { hash } = require('../account/helper');
const Session = require('../account/session');
const OrderTable = require('../order/table.js');
const RestaurantTable = require('../restaurant/table.js');
const AccountTable = require('../account/table.js');
const CustomerTable = require('../customer/table.js');
const CartTable = require('../cart/table');

const router = new Router();

// Order Operations : Shift cart to Order Can only be done by customer
router.post('/addOrder',(req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);

    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        let accountId = account.id;
        return CustomerTable.getCustomer({ accountId })
    })
    .then(({ customer }) => {
        let customerId = customer.customerId;
        let ordered = false;
        return CartTable.getCart({customerId, ordered})          
    })
    .then(({ cart })=>{
        let { cartId } = cart;
        return CartTable.orderTotal({ cartId })
    })
    .then(({ cart })=>{
        let { cartId, total } = cart;
        OrderTable.storeOrder({ cartId, total })
        .then(()=>{
            return  CartTable.cartToOrder({ cartId })
        })
        .then(()=>{
            res.json({ message:'Order Placed'})
        })
        .catch(error => next(error))
    })
    .catch(error => next(error));
});

// Order Operation: View Order Retaurant POV
router.get('/getOrder',(req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);

    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        let accountId = account.id;
        return RestaurantTable.getRestaurant({ accountId })
    })
    .then(({ restaurant }) => {
        let { restaurantId } = restaurant;
        return OrderTable.getOrder({ restaurantId })
    })
    .then(({ order }) => {
        res.json({ order });
    })
    .catch(error => next(error));
});

module.exports = router;    
