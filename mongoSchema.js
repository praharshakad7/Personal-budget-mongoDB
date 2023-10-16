const mongoose = require('mongoose');



const mongoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: (value)=>/^#([0-9A-Fa-f]{6})$/.test(value),
      message:"data must be of at least 6 digits (hexadecimal format. (eg: #ED4523)).",
    },
  },
});

module.exports = mongoSchema;