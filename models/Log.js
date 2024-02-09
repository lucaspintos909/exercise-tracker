const mongoose = require("mongoose");

// Schema
let LogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: Date,
    },
  ],
});

// Model
let LogModel = mongoose.model("log", LogSchema);

module.exports = LogModel;
