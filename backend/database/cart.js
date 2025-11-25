const mongosse = require("mongoose");

const cart = mongosse.Schema({
    name:{
        type:mongosse.Schema.Types.ObjectId,
        ref:"user"
    },
    
    product:{
        type:mongosse.Schema.Types.ObjectId,
        ref:"prod"
    }
});

module.exports = mongosse.model("cart",cart);