const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  cover: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }, 
  category: {
  type: String,
  required: true,
  default: "Other"  
},
  
  ratings: {
  type: [
    {
      email: String,
      value: Number
    }
  ],
  default: []   
}

}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);