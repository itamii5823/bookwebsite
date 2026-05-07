const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "delj8ewyu",
  api_key: 861688637913977,
  api_secret: "aS0vhPtZYIqEZWJNZv0JjWyzZsA"
});

module.exports = cloudinary;