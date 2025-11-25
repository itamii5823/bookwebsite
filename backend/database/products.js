const mongosse = require("mongoose");

const prodSchema = mongosse.Schema({
    name: String,
    rate: Number,
    color:String,
    quantity: Number,
    imageurl:String,
    items:String,
});

module.exports = mongosse.model("prod",prodSchema);