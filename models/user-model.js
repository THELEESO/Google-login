const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true, minlength: 6, maxlength: 255 },
  google: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
  thumbnail: { type: String }, //縮圖
  //   Local Login
  email: {
    type: String,
  },
  password: {
    type: String,
    maxlength: 1024,
    minlength: 8,
  },
});

module.exports = mongoose.model("User", userSchema);
