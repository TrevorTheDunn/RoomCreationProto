const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

    app.post('/createRoom', mid.requiresLogin, controllers.Room.createRoom);

    app.get('/getRoom', controllers.Room.getRoom);

    app.get('/roomView', controllers.Room.roomPage);

    app.get('/creator', mid.requiresLogin, controllers.Room.creatorPage);

    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);

    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

    app.get('/', controllers.Room.listPage);
};

module.exports = router;