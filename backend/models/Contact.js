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
  },
  city: String,
  province: String,
  groups: [String],
  phone_number: {
    type: String,
    required: true,
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Contact', contactSchema);
