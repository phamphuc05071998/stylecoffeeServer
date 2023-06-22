const express = require("express");
const productController = require("./../Controllers/productController");
const router = express.Router();

router
  .route("/")
  .post(
    productController.uploadImage,
    productController.resizeImage,
    productController.createOne
  )
  .get(productController.getAll);
router
  .route("/:id")
  .get(productController.getOne)
  .delete(productController.deleteOne)
  .patch(productController.updateOne);

module.exports = router;
