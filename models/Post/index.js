const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: [true, 'Укажите id статьи'],
  },
  title: {
    type: String,
    required: [true, 'Укажите title статьи'],
    trim: true,
  },
  date: {
    type: String,
    required: [true, 'Укажите date статьи'],
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'Укажите text статьи'],
    trim: true,
  },
})


module.exports = mongoose.model('Post', schema);
