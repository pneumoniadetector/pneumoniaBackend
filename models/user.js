var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
