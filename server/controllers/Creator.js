// currentRoomData - roomData is saved to this for testing purposes
// as opposed to being saved to a database
let currentRoomData;

// creatorPage - displays the creator.handlebars page
const creatorPage = async (req, res) => res.render('creator');

// createRoom - takes in roomData through the post request
// and saves it as currentRoomData, then redirects to room.handlebars
const createRoom = async (req, res) => {

    if(!req.body.name) {
        return res.status(400).json({
            error: 'Name is required!'
        });
    } else if (!req.body.theme) {
        return res.status(400).json({
            error: 'Theme is required!'
        });
    } else if (!req.body.amtMembers) {
        return res.status(400).json({
            error: 'Amount of members is required!'
        });
    }

    const roomData = {
        name: req.body.name,
        theme: req.body.theme,
        amtMembers: req.body.amtMembers,
    };

    currentRoomData = roomData;

    return res.status(201).json({
        redirect: '/roomView'
    });
};

// getRoomData - returns the currentRoomData as a JSON
const getRoomData = async (req, res) => {
    return res.json({
        name: currentRoomData.name,
        theme: currentRoomData.theme,
        amtMembers: currentRoomData.amtMembers,
    });
};

module.exports = {
    creatorPage,
    createRoom,
    getRoomData,
};