const mongoose = require("mongoose");

// Schema
let UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
});

// Models
let UserModel = mongoose.model("user", UserSchema);

export { UserModel };
