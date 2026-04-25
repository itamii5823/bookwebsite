const mongosse = require("mongoose");


mongosse.connect(process.env.MONGO_URL);

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

 savedBooks: {
  type: [String],
  default: []
},
isPremium: { type: Boolean, default: false },
premiumExpiry: Date
    
});

module.exports = mongosse.model("user",userSchema);