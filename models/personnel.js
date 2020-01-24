const mongoose = require('mongoose');


const personnelSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

module.exports = mongoose.model("Personnel", personnelSchema);