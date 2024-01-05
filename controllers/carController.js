const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Car = require("./../models/carModel");
const queryOperator = require("./../utils/queryOperator");
exports.getAllCars = catchAsync(async (req, res, next) => {
  const resultQuery = new queryOperator(Car.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const cars = await resultQuery.query;

  res.status(200).json({
    status: "success",
    results: cars.length,
    data: {
      cars,
    },
  });
});
exports.getOneCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(
      new AppError("Aucun vehicule trouver avec ce identifiant", 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      car,
    },
  });
});
exports.createCar = catchAsync(async (req, res, next) => {
  const newCar = await Car.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      car: newCar,
    },
  });
});
exports.updateCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(
      new AppError("Aucun vehicule trouver avec ce identifiant", 404)
    );
  }
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      car: updatedCar,
    },
  });
});
exports.deleteCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(
      new AppError("Aucun vehicule trouver avec ce identifiant", 404)
    );
  }
  await Car.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});
