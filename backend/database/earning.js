const mongosse = require("mongoose");
const earningsSchema = new mongoose.Schema({
  creatorEmail: String,
  totalTime: Number,
  percentage: Number,
  earnings: Number,
  month: String,
  paid: { type: Boolean, default: false }
});

const Earnings = mongoose.model("Earnings", earningsSchema);