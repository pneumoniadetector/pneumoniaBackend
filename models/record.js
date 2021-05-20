var mongoose = require("mongoose");

var recordSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true
    },
    image_uri: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);
