const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  nameHyphened: {type: String, required: true },
  rating: { type: Number, required: true }, // rating out of 10
  course: { type: String, required: true },
  year: { type: Number, required: true },
  review: { type: String, required: true },
  reviewer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, require: true }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
