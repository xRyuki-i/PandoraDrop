const { Router } = require('express');
const AccountTable = require('../account/table.js');
const Session = require('../account/session.js');
const { hash } = require('../account/helper');
const { setSession } = require('./helper');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const {username, password, userRole} = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
        .then(({ account }) => {
            if (!account) {
                AccountTable.storeAccount({usernameHash, passwordHash, userRole})
            } else {
                const error = res.status(409).json({ message: 'This username has already been taken' });
                
                throw error;
            }
        })
        .then(() => {
            return setSession({ username, res });
        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(error => next(error));  
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
        if(account && account.passwordHash === hash(password)) {
            const { sessionId } = account;

            return setSession({ username, res, sessionId });
        } else {
            const error = res.status(409).json({ message: 'Incorrect username/password' });

            throw error;
        }
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

router.get('/logout',(req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId: '',
        usernameHash: hash(username)
    })
    .then(() => {
        res.clearCookie('sessionString');

        res.json({ message: 'Successful logout' });
    })
    .catch(error => next(error));
});

module.exports = router;