const { Router } = require('express');
const { hash } = require('../account/helper');
const Session = require('../account/session');
const RestaurantTable = require('../restaurant/table.js');
const AccountTable = require('../account/table.js');

const router = new Router();

router.post('/setProfile', (req, res, next) => {
    const { logo, address, openingTime, priceRange, description } = req.body;
    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);
    
    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        let accountId = account.id;
        RestaurantTable.storeRestaurant({accountId, logo, address, openingTime, priceRange, description})
    })
    .then(() => {
        res.json({ message: 'Profile successfully set up' });
    })
    .catch(error => next(error));

});

router.get('/getProfile',(req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);

    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        let accountId = account.id;
        return RestaurantTable.getRestaurant({ accountId })
    })
    .then(({ restaurant }) => {
        res.json({ restaurant });
    })
    .catch(error => next(error));
});

module.exports = router;   