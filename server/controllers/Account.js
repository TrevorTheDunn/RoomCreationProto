const models = require('../models');

const { Account } = models;

const loginPage = async (req, res) => res.render('login');

const signupPage = async (req, res) => res.render('signup');

const isLoggedIn = (req, res) => {
    if(req.session.account !== undefined) {
        return res.json({ loggedIn: true });
    }

    return res.json({ loggedIn: false });
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

const login = (req, res) => {
    const username = `${req.body.username}`;
    const pass = `${req.body.pass}`;

    if (!username || !pass) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    return Account.authenticate(username, pass, (err, account) => {
        if (err || !account) {
            return res.status(401).json({ error: 'Wrong username or password!' });
        }

        req.session.account = Account.toAPI(account);

        return res.json({ redirect: '/' });
    });
};

const signup = async (req, res) => {
    const username = `${req.body.username}`;
    const pass = `${req.body.pass}`;
    const pass2 = `${req.body.pass2}`;

    if (!username || !pass || !pass2) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    if (pass !== pass2) {
        return res.status(400).json({ error: 'Passwords do not match!' });
    }

    try {
        const hash = await Account.generateHash(pass);
        const newAccount = new Account({ username, password: hash });
        await newAccount.save();
        req.session.account = Account.toAPI(newAccount);
        return res.json({ redirect: '/' });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Username already in use!' });
        }
        return res.status(500).json({ error: 'An error occurred!' });
    }
};

const getAccount = async (req, res) => {
    try {
        const query = {};
        const docs = await Account.find(query)
            .select('username password _id').lean().exec();

        for(let i = 0; i < docs.length; i++) {
            if(docs[i].username === req.session.account.username) {
                return res.json({ account: docs[i] });
            }
        }

        return res.status(400).json({ error: 'Could not find account!' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving account!' });
    }
};

module.exports = {
    loginPage,
    signupPage,
    isLoggedIn,
    logout,
    login,
    signup,
    getAccount,
};