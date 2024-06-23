const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const brand = await createBrandService(req.body);

    res.status(201).json({
      status: "success",
      message: "Brand created successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.getAllBrand = async (req, res, next) => {
  try {
    const brands = await getBrandService();

    res.status(201).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);

    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "Brand not found",
      });
    }

    res.status(201).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await updateBrandService(id, req.body);

    if (!brand.nModified) {
      return res.status(404).json({
        status: "fail",
        message: "Couldn't update the brand with this id",
      });
    }

    res.status(201).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not updated",
      error: error.message,
    });
  }
};
