const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: [true, 'Укажите id скилла'],
  },
  groupId: {
    type: String,
    required: [true, 'Укажите groupId скилла'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Укажите name скилла'],
    trim: true,
  },
  value: {
    type: Number,
    required: [true, 'Укажите value скилла'],
    trim: true,
  },
})

module.exports = mongoose.model('Skill', schema);
