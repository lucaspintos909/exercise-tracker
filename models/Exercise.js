const mongoose = require("mongoose");

// Schema
let ExerciseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});

// Model
let ExerciseModel = mongoose.model("exercise", ExerciseSchema);

module.exports = ExerciseModel;
