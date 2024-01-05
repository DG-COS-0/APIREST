const AppError = require("./../utils/appError");

const handleCastMongooseErr = (err) => {
  console.log(
    "C'est bonfvgbjhnk,lm;ù$ù vbn,klmùlkjhgfvcdgjhklmùmlkjhgfdfghjklmùlkjhgfdfghjklmlkjh"
  );
  const message = `Donnée entrer invalide  **${err.value}** -> **${err.path}**  .`;
  return new AppError(message, 400);
};

// const handleDuplicateFieldsMongooseErr = (err) => {
//   console.log("errr", err);
//   const property = Object.keys(err.keyPattern);

//   const value = err.KeyValue.brand;

//   const message = `Il existe deja une valeur : ${value} pour la propriete ${property}. Veuillez utiliser une autre valeur!`;
//   return new AppError(message, 400);
// };

const handleMongooseValidatorErr = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  console.log("is in dev error");
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR VERRY BAD THINGS HAPPENS", err);

    res.status(500).json({
      status: "error",
      message:
        "Oups. Quelque chose n'a pas marché. Veuillez contacter l'entreprise pour signaler un probleme",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log("Voici l'erreur", err.errors.code);
    let error = { ...err };
    error.name = err.name;
    error.code = err.code;
    if (error.name === "CastError") error = handleCastMongooseErr(error);
    if (error.code === "ERR_ASSERTION")
      error = handleDuplicateFieldsMongooseErr(error);
    if (error.name === "ValidationError")
      error = handleMongooseValidatorErr(error);

    sendErrorProd(error, res);
  }
};
