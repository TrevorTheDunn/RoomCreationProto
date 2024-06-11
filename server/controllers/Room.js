//const models = require('../models');

//const { Room } = models;

let rooms = [];

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

    rooms[rooms.length] = roomData;

    return res.status(201).json({
        redirect: '/roomView',
    });
};

module.exports = {
    creatorPage,
    roomPage,
    createRoom,
};