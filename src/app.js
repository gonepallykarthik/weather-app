const express = require("express");
const path = require("path");
const weather = require("./utlis/forecast");
const geocode = require("./utlis/geocode");

const hbs = require("hbs");
const app = express();
const path1 = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const paritalspath = path.join(__dirname, "../templates/partials");

app.use(express.static(path1));
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(paritalspath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    about: "weather",
    name: "karthik",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About us",
    name: "karthik",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "if you have any issues please let us know",
    title: "Help",
    name: "karthik",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address not mentioned",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, Place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    weather(latitude, longitude, (error, weatherdata) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        Forecast: weatherdata.weather,
        Temperature: weatherdata.Temperature,
        Time: weatherdata.Time,
        Humidity: weatherdata.humidity,
        Place,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    msg: "Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    msg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server started");
});
