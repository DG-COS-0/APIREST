const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const port = 3300 || 3000;
dotenv.config({ path: "./config.env" });

databaseURI = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(databaseURI, {})
  .then((connectionInfo) => {
    console.log("The connection with de database is succesfully maked");
  })
  .catch((err) => {
    console.log("Error when trying to connect to the database");
    console.log(err);
  });
app.listen(port, () => {
  console.log(
    `Votre application demarre sur http://localhost:${port} . Veuillez lancer vos requetes a cette addresse`
  );
});
