const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/users", (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const user = new User({ username });
  user
    .save()
    .then(({ username, _id }) => {
      res.json({ username, _id });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
