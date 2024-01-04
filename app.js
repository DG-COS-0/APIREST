const express = require("express");
const morgan = require("morgan");
const app = express();

const port = 3300;
app.use("/", (req, res) => {
  res.status(200).send("Votre requete a bien ete recus");
});
app.listen(port, () => {
  console.log(
    `Votre application demarre sur http://localhost:${port} . Veuillez lancer vos requetes a cette addresse`
  );
});
