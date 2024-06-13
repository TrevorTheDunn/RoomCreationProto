const mongoose = require('mongoose');

let RoomModel = {};

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true,
    },
    amtMembers: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

RoomSchema.statics.toAPI = (docs) => ({
    name: docs.name,
    theme: docs.theme,
    amtMembers: docs.amtMembers,
});

RoomModel = mongoose.model('Room', RoomSchema);
module.exports = RoomModel;