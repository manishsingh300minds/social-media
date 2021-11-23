const mongoose = require('mongoose');

const postModel = mongoose.Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Post',postModel);
