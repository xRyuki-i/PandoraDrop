const { Router } = require('express');
const { hash } = require('../account/helper');
const Session = require('../account/session');
const FoodTable = require('../food/table.js');
const AccountTable = require('../account/table.js');
const RestaurantTable = require('../restaurant/table.js');

const router = new Router();

router.post('/add', (req, res, next) => {
    const { foodName, price } = req.body;
    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);
    
    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        console.log(account);
        let accountId = account.id;
        return RestaurantTable.getRestaurant({ accountId })
    })
    .then(({ restaurant }) => {
        console.log(restaurant);
        let restaurantId = restaurant.restaurantId;
        FoodTable.storeFood({foodName, price, restaurantId})
    })
    .then(() => {
        res.json({ message: 'New food added' });
    })
    .catch(error => next(error));

});

router.get('/getFood',(req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);

    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        let accountId = account.id;
        return RestaurantTable.getRestaurant({ accountId })
    })
    .then(({ restaurant }) => {
        let restaurantId = restaurant.restaurantId;
        return FoodTable.getFood({ restaurantId })
    })
    .then(({ food }) => {
        res.json({ food });
    })
    .catch(error => next(error));
});

module.exports = router;    
