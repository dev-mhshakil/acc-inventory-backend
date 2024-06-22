const Product = require("../models/Product.model");
const {
  getProductService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductService,
  bulkDeleteService,
} = require("../services/product.services");

exports.createProduct = async (req, res, next) => {
  try {
    //   save or create a product

    // const product = new Product(req.body);

    // const product = await Product.create(req.body);

    // if (product.quantity == 0) {
    //   product.status = "out-of-stock";
    // }

    const result = await createProductService(req.body);
    result.logger();

    res.status(201).json({
      status: "success",
      message: "Product saved successfully",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    // sort, page, limit -> exclude
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((field) => delete filters[field]);

    // gt, lt, gte, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductService(filters, queries);

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Can't find product",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await updateProductByIdService(id, data);

    res.status(200).json({
      status: "success",
      results: "product updated successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Can't update product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const product = await bulkUpdateProductService(data);

    res.status(200).json({
      status: "success",
      results: "product updated successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Can't update product",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await deleteProductService(id);

    if (!result.deletedCount) {
      return res.status(404).json({
        status: "fail",
        message: "Can't delete product",
        error: error.message,
      });
    }
    res.status(200).json({
      status: "success",
      results: "product deleted successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Can't delete product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const product = await bulkDeleteService(req.body.ids);

    res.status(200).json({
      status: "success",
      results: "products deleted successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Can't delete the given products",
      error: error.message,
    });
  }
};

exports.insertManyProducts = async (req, res, next) => {
  try {
    const data = require("../data/data.json");
    const products = await Product.insertMany(data);

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Can't insert the given products",
      error: error.message,
    });
  }
};
