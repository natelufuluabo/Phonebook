const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: String,
  province: String,
  groups: [String],
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Contact', contactSchema);

