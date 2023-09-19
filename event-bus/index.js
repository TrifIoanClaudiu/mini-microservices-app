const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];
app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  try {
    axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
      console.log(err);
    });
    axios.post("http://comments-srv:4001/events", event).catch((err) => {
      console.log(err);
    });
    axios.post("http://query-srv:4002/events", event).catch((err) => {
      console.log(err);
    });
    axios.post("http://moderation-srv:4003/events", event).catch((err) => {
      console.log(err);
    });

    res.send({ status: "OK" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Server is running on port 4005");
});
