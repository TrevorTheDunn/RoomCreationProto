const mongoose = require('mongoose');
const _ = require('underscore');

//const setName = (name) => _.escape(name).trim();
//const setTheme = (theme) => _.escape(theme).trim();

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    //trim: true,
    //set: setName,
  },
  theme: {
    type: String,
    required: true,
    //trim: true,
    //set: setTheme,
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

RoomSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  theme: doc.theme,
  amtMembers: doc.amtMembers,
});

const RoomModel = mongoose.model('Room', RoomSchema);
module.exports = RoomModel;
