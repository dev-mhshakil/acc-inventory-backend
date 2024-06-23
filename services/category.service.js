const Category = require("../models/Category.model");

exports.createCategoryService = async (data) => {
  const result = await Category.create(data);

  return result;
};

exports.getCategoryService = async () => {
  const result = await Category.find({});

  return result;
};

exports.updateCategoryByIdService = async (id, data) => {
  const result = await Category.updateOne({ _id: id }, { $set: data });
  return result;
};
