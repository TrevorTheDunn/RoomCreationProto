const models = require('../models');

const { Room } = models;

const listPage = async (req, res) => res.render('list');

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
};

const getRoom = async (req, res) => {
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
    listPage,
    creatorPage,
    roomPage,
    createRoom,
    getRoom,
};