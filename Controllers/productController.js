const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");
const Product = require("../Models/productModel");
const handlerFactory = require("./../Controllers/handlerFactory");
const crypto = require("crypto");

const storage = multer.memoryStorage();
function fileFilter(req, file, cb) {
  console.log(req, file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cd(new AppError("File uploaded not an image", 400), false);
  }
}
const generateName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
exports.uploadImage = upload.single("image");
exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.file) next();
  const imageName = generateName(16) + ".jpeg";
  await sharp(req.file.buffer)
    .resize(4000, 4000)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`public/img/${imageName}`);
  req.body.image = `${req.protocol}://${req.hostname}:${process.env.PORT}/public/img/${imageName}`;
  next();
});

exports.getAll = handlerFactory.getAll(Product);
exports.deleteOne = handlerFactory.deleteOne(Product);
exports.updateOne = handlerFactory.updateOne(Product);
exports.createOne = handlerFactory.createOne(Product);
exports.getOne = handlerFactory.getOne(Product);
