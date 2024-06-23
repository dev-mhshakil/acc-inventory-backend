const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");

router
  .route("/")
  .post(brandController.createBrand)
  .get(brandController.getAllBrand);

router.route("/:id").patch(brandController.getBrandById);

module.exports = router;
