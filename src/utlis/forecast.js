const request = require("request");
require("dotenv").config({ path: "../.env" });

const weather = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}=" +
    ${latitude} +
    "," +
    ${longitude} +
    "&units=m`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable to connect to weather services make sure that you are connected to internet",
        undefined
      );
    } else if (response.body.error) {
      callback("Unable to find location try again", undefined);
    } else {
      callback(undefined, {
        weather: response.body.current.weather_descriptions[0],
        Temperature: response.body.current.temperature,
        Place: response.body.location.name,
        Time: response.body.location.localtime,
        humidity: response.body.current.humidity,
      });
    }
  });
};
module.exports = weather;
