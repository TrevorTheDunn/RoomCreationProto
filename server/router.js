const controllers = require('./controllers');

const router = (app) => {

    app.get('/getRoomData', controllers.Creator.getRoomData);

    app.get('/roomView', controllers.Room.roomPage);

    app.post('/createRoom', controllers.Creator.createRoom);

    app.get('/roomCreator', controllers.Creator.creatorPage);
    app.get('/', controllers.Creator.creatorPage);

};

module.exports = router;