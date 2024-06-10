const controllers = require('./controllers');

const router = (app) => {
    app.get('/', controllers.Room.creatorPage);
};

module.exports = router;