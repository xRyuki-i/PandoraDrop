const { Router } = require('express');
const { hash } = require('../account/helper');
const Session = require('../account/session');
const CartTable = require('../cart/table.js');
const CustomerTable = require('../customer/table.js');
const AccountTable = require('../account/table.js');

const router = new Router();

// Cart Operations : Add to cart
router.post('/addToCart',(req, res, next) => {
    const { foodId } = req.body;
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
        CartTable.getCart({customerId, ordered})
        .then(({ cart }) => {       
            if (!cart) {
                CartTable.storeCart({ customerId })
                .then(()=>{
                    return CartTable.getCart({customerId, ordered})
                })
                .then(({ cart })=>{
                    let cartId = cart.cartId;
                    return CartTable.storeFood({cartId, foodId})
                })
                .then(()=>{
                    res.json({ message:'Food item added to cart' })
                })
                .catch(error=> next(error));
            }else{
                let cartId = cart.cartId;
                CartTable.storeFood({cartId, foodId})
                .then(()=>{
                    res.json({ message:'Food item added to cart' })
                })
                .catch(error=> next(error));
            }
        })
    })
    .catch(error => next(error));
});

// Cart Operation : Remove Food Item from Cart
router.delete('/removeFromCart/:foodId',(req, res, next) => {
    const { foodId } = req.params;
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
    .then(({ cart }) => {       
        let cartId = cart.cartId;
        return CartTable.removeFood({ cartId, foodId })
    })
    .then(()=>{
        res.json({ message:'Food item removed from cart' })
    })
    .catch(error => next(error));
});

// Cart Operation : Update the Quantity of Food Item
router.put('/updateQuantity/:foodId',(req, res, next) => {
    const { foodId } = req.params;
    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);

    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        let accountId = account.id;
        return CustomerTable.getCustomer({ accountId })
    })
    .then(({ customer }) => {
        let customerId = customer.customerId;
        let ordered = 0;
        return CartTable.getCart({ customerId, ordered })
    })
    .then(({ cart }) => {
        let cartId = cart.cartId;
        return CartTable.getCartFood({ cartId, foodId })
    })
    .then(({ cartfood })=>{
        let cartId = cartfood.cartId;
        let Quantity = cartfood.quantity + 1;
        return CartTable.updateQuantity({ cartId, foodId, Quantity })
    })
    .then(()=>{
        res.json({ message:'quantity updated'})
    })
    .catch(error => next(error));
});

// View Cart Customer POV
router.get('/getCustomerCart',(req, res, next) => {

    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);

    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        let accountId = account.id;
        return CustomerTable.getCustomer({ accountId })
    })
    .then(({ customer }) => {
        let customerId = customer.customerId;
        let ordered = 0;
        return CartTable.getCustomerCart({ customerId, ordered })
    }).then(({ cart }) => {
        res.json( cart )
    })
    .catch(error => next(error));
});

module.exports = router;    
