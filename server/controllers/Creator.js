

const creatorPage = async (req, res) => res.render('creator');

const createRoom = async (req, res) => {
    console.log("Create room called!");
};

module.exports = {
    creatorPage,
    createRoom,
};