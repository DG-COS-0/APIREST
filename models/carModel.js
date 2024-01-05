const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  brand: { type: String, required: [true, "la voiture doit avoir une marque"] },
  model: {
    type: String,
    required: [true, "Veuillez specifier le modele de la voiture"],
  },
  bodyType: {
    type: String,
    required: [true, "Veuillez spécifier une carroseries pour votre voiture"],
    enum: [
      "SUV",
      "Hayon",
      "Berline",
      "Break",
      "Coupé",
      "Fourgon",
      "Monospace",
      "Cabriolet",
    ],
    default: "Monospace",
  },

  yearOfManufacture: Date,
  color: {
    type: String,
    required: [true, "Veuillez specifier la couleur de la voiture"],
  },
  seatingCapacity: {
    type: Number,
    required: [
      true,
      "Veuillez specifier le nombre de place dans de la voiture",
    ],
    enum: {
      values: [2, 3, 4],
      message: "Les places dans le vehicules varient en 2 et 4",
    },
  },
  fuelType: {
    type: String,
    required: [true, "Veuillez spécifier le type de carburant de la voiture "],
    enum: {
      values: ["Essence", "Diesel", "Electrique", "Hybride", "Batterie"],
      message:
        "Veuillez choisir une valeurs adpatées pour le type de carburants de votre voiture",
    },
    default: "Essence",
  },
  transmission: {
    type: String,
    required: [
      true,
      "Veuillez specifier le type de transmission de la voiture",
    ],
    enum: {
      values: ["manuel", "automatique"],
      message:
        "Pour la transmission de votre voiture, elle est soit automatique ou manuel",
    },
  },
  mileage: {
    type: Number,
    required: [
      true,
      "Veuillez specifier le nombre de kilometre qu'a parcourue le vehicule. Il est noté sur 10",
    ],
    default: 0,
  },
  vehicleCondition: {
    type: Number,
    required: [true, "Veuillez specifier l'etat du dehicule"],
    default: 9,
    enum: {
      values: [2, 3, 4, 5, 6, 7, 8, 9],
      message: "L'etat du vehicule varient entre 2  et  9",
    },
  },
  isAvailableNow: { type: Boolean, default: true },
  dailyLocationPrice: {
    type: Number,
    required: [
      true,
      "Veuillez specifier le prix journalier de location du vehicule ",
    ],
  },
  currentLocation: String,
  lastMaintenanceDate: {
    type: Date,
  },
  additionalFeatures: [String],
  vehiclePhotos: [
    {
      type: String,
      required: true,
    },
  ],
  fuelPolicy: {
    type: String,
    enum: [
      "A retourner avec le plein",
      "A ne pas retourner vide",
      "non mentionner",
    ],
    default: "non mentionner",
  },
  insurance: {
    type: String,
    required: [
      true,
      ,
      "Veuillez specifier quelque infos par rapport a l'assurance de vehicule",
    ],
  },
});
module.exports = mongoose.model("Car", carSchema);
