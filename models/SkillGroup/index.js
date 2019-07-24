const mongoose = require('mongoose');

// const SkillSchema = require('./SkillSchema');

const schema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: [true, 'Укажите id группы скиллов'],
  },
  title: {
    type: String,
    required: [true, 'Укажите title группы скиллов'],
    trim: true,
  }
})


module.exports = mongoose.model('SkillGroup', schema);
