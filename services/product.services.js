const Product = require("../models/Product.model");

exports.getProductService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);

  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, products };
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProductByIdService = async (id, data) => {
  const product = await Product.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return product;
};

exports.bulkUpdateProductByIdService = async (data) => {
  const product = await Product.updateMany(
    { _id: data.ids },
    { $set: data.data },
    { runValidators: true }
  );

  return product;
};

exports.deleteProductByIdService = async (id) => {
  const product = await Product.deleteOne({ _id: id });

  return product;
};

exports.bulkDeleteService = async (ids) => {
  const product = await Product.deleteMany({});

  return product;
};
