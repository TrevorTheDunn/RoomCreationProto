const controllers = require('./controllers');

const router = (app) => {

    app.post('/createRoom', controllers.Room.createRoom);

    app.get('/getRoom', controllers.Room.getRoom);

    app.get('/roomView', controllers.Room.roomPage);

    app.get('/creator', controllers.Room.creatorPage);
    app.get('/', controllers.Room.creatorPage);
};

module.exports = router;