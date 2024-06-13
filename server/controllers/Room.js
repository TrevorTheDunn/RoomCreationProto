const models = require('../models');

const { Room } = models;

//let rooms = [];

//let room;

const creatorPage = async (req, res) => res.render('creator');

const roomPage = async (req, res) => res.render('room');

const createRoom = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Name is required!',
        });
    } else if (!req.body.theme) {
        return res.status(400).json({
            error: 'Theme is required!',
        });
    } else if (!req.body.amtMembers) {
        return res.status(400).json({
            error: 'Amount of members is required!',
        });
    }

    const roomData = {
        name: req.body.name,
        theme: req.body.theme,
        amtMembers: req.body.amtMembers,
    };

    //rooms[rooms.length] = roomData;

    //room = roomData;

    try {
        const newRoom = new Room(roomData);
        await newRoom.save();
        return res.status(201).json({
            redirect: '/roomView',
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Room already exists!' });
        }
        return res.status(500).json({ error: 'An error occurred making room!' });
    }

    /*return res.status(201).json({
        redirect: '/roomView',
    });*/
};

const getRoom = async (req, res) => {
    /*console.log("Get room called");

    const roomData = {
        name: room.name,
        theme: room.theme,
        amtMembers: room.amtMembers,
    };

    return res.status(200).json({
        roomData,
    });*/

    try {
        const query = {};
        const docs = await Room.find(query)
            .select('name theme amtMembers')
            .lean().exec();

        return res.json({ rooms: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving room! '});
    }
};

module.exports = {
    creatorPage,
    roomPage,
    createRoom,
    getRoom,
};