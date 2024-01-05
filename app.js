const express = require("express");
const morgan = require("morgan");
const app = express();
const globalErrorHandler = require("./controllers/errorController");
app.use(express.json());
const carRoute = require("./routes/carRoute");

app.use("/api/v1/cars", carRoute);
app.use(globalErrorHandler);
app.use("*", (req, res) => {
  res.status(404).json({
    status: `Aucun point d'entrée ne correspond a "${req.originalUrl}" sur ce serveur`,
  });
});
module.exports = app;
