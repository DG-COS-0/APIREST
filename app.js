const express = require("express");
const morgan = require("morgan");
const app = express();
const carRoute = require("./routes/carRoute");

app.use("/api/v1/cars", carRoute);
module.exports = app;
