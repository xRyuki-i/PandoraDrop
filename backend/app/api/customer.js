const { Router } = require('express');
const { hash } = require('../account/helper');
const Session = require('../account/session');
const CustomerTable = require('../customer/table.js');
const AccountTable = require('../account/table.js');

const router = new Router();

router.post('/setProfile', (req, res, next) => {
    const {profilePicture, contact, address} = req.body;
    const { username } = Session.parse(req.cookies.sessionString);
    const usernameHash = hash(username);
    
    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        let accountId = account.id;
        CustomerTable.storeCustomer({accountId, profilePicture, contact, address})
    })
    .then(() => {
        res.json({ message: 'Profile successfully set up' });
    })
    .catch(error => next(error));

});

module.exports = router;    
