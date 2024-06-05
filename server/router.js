const controllers = require('./controllers');

const router = (app) => {
  app.get('/getRoomData', controllers.Room.getRoomData);

  app.get('/roomView', controllers.Room.roomPage);

  app.post('/createRoom', controllers.Room.createRoom);

  app.get('/roomCreator', controllers.Room.creatorPage);
  app.get('/', controllers.Room.creatorPage);
};

module.exports = router;
