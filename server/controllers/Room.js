const models = require('../models');

const { Room } = models;

// creatorPage - displays the creator.handlebars page
const creatorPage = async (req, res) => res.render('creator');

// roomPage - renders room.handlebars
const roomPage = async (req, res) => res.render('room');

// createRoom - takes in roomData through the post request
// and creates a new Room using the data, then saves it
// and redirects to the room viewer
const createRoom = async (req, res) => {

  if (!req.body.name) {
    return res.status(400).json({
      error: 'Name is required!',
    });
  } if (!req.body.theme) {
    return res.status(400).json({
      error: 'Theme is required!',
    });
  } if (!req.body.amtMembers) {
    return res.status(400).json({
      error: 'Amount of members is required!',
    });
  }

  const roomData = {
    name: req.body.name,
    theme: req.body.theme,
    amtMembers: req.body.amtMembers,
  };

  const newRoom = new Room(roomData);

  try {
    return res.status(400).json({
        error: 'Just before save',
    });
    /*await newRoom.save();
    return res.status(201).json({
      redirect: '/roomView',
    });*/
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Room already exists!' });
    }
    return res.status(500).json({ error: 'An error occurred making room!' });
  }
};

// getRoomData - fetches a room with the query
// returns the retrieved rooms
const getRoomData = async (req, res) => {
  try {
    const query = {};
    const docs = await Room.find(query)
      .select('name theme amtMembers')
      .lean().exec();

    return res.json({ rooms: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving room! ' });
  }
};

module.exports = {
  creatorPage,
  createRoom,
  getRoomData,
  roomPage,
};
