const catchAsync = require("./../utils/catchAsync");
const APIfeature = require("./../utils/APIfeature");
const AppError = require("./../utils/AppError");
exports.getAll = (modal) => {
  return catchAsync(async (req, res, next) => {
    const feature = new APIfeature(modal.find(), req.query);
    feature.exclude().sort().limitFields().pagination();
    const data = await feature.query;

    if (!data)
      return next(new AppError("Can not find any doc with that id", 400));
    res.status(200).json({
      status: "success",
      length: data.length,
      data,
    });
  });
};
exports.getOne = (modal) => {
  return catchAsync(async (req, res, next) => {
    const data = await modal.findById(req.params.id);
    if (!data)
      return next(new AppError("Can not find any doc with that id", 400));
    res.status(200).json({
      status: "success",
      data,
    });
  });
};
exports.deleteOne = (modal) => {
  return catchAsync(async (req, res, next) => {
    await modal.findOneAndDelete({ _id: req.params.id });
    res.status(204).json({
      message: "success",
    });
  });
};
exports.updateOne = (modal) => {
  return catchAsync(async (req, res, next) => {
    const data = await modal.findByIdAndUpdate(req.params.id, req.body);
    if (!data)
      return next(new AppError("Can not find any doc with that id", 400));
    res.status(200).json({
      status: "success",
      data,
    });
  });
};
exports.createOne = (modal) => {
  return catchAsync(async (req, res, next) => {
    const data = await modal.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  });
};
