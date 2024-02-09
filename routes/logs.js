const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Exercise = require("../models/Exercise");

/*
You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.

A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.

A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.

Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.

The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.

The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.

The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.

You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
*/

router.get("/:_id/logs", (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;
  User.findById(userId).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let query = Exercise.find({ username: user.username });
    if (from) {
      query.where("date").gte(new Date(from));
    }
    if (to) {
      query.where("date").lte(new Date(to));
    }
    if (limit) {
      query.limit(parseInt(limit));
    }
    query
      .exec()
      .then((exercises) => {
        const log = {
          username: user.username,
          count: exercises.length,
          log: exercises,
        };

        /*
          The date property of any object in the log array that is returned 
          from GET /api/users/:_id/logs should be a string. Use the
          dateString format of the Date API.
        */
        log.log = log.log.map((exercise) => {
          return {
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString(),
          };
        });

        res.json(log);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
});

module.exports = router;
