const {
  createCategoryService,
  getCategoryService,
} = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await createCategoryService(req.body);

    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Cannot create the category",
      error: error.message,
    });
  }
};

exports.getAllCategory = async (req, res, next) => {
  try {
    const category = await getCategoryService();

    res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Cannot get the category",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await updateCategoryByIdService(id, req.body);

    res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Cannot update the category",
      error: error.message,
    });
  }
};
