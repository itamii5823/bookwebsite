const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: String,
  amount: Number,
  orderId: String,
  paymentId: String,
  type: String
});

module.exports = mongoose.model("Payment", paymentSchema);