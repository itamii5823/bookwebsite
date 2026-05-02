const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema({
  userEmail: String,
  bookId: String,
  creatorEmail: String, 
  totalTime: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Watch", watchSchema);