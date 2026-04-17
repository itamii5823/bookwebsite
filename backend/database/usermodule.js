const mongosse = require("mongoose");


mongosse.connect("mongodb://localhost:27017/user");

const userSchema = mongosse.Schema({
    username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true},
    cart: [{
       product:{type:mongosse.Schema.Types.ObjectId , ref:"prod"},
       quantity:{type:Number , default:1},
       total:{type:Number,default:0}
    }]
});

module.exports = mongosse.model("user",userSchema);