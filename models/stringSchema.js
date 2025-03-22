const mongoose = require('mongoose');

const stringSchema = new mongoose.Schema({
  value: { type: String, required: true }
});

module.exports = mongoose.model('StringData', stringSchema);
