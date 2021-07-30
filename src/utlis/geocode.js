const request = require("request");
require("dotenv").config({ path: "../.env" });

const geocode = (loaction, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/"encodeURIComponent(${loaction})".json?access_token=${process.env.MAP_BOX_KEY}&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to loaction services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location ", undefined);
    } else {
      callback(undefined, {
        Place: response.body.features[0].place_name,
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
