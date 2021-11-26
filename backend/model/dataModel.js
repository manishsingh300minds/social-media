const mongoose = require('mongoose');

const postModel = mongoose.Schema({
  title: String,
  description: String,
  // image: String,
});

module.exports = mongoose.model('Post',postModel);
