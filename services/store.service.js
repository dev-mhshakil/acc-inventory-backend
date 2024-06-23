const Store = require("../models/Store.model");

exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

exports.getStoreService = async () => {
  const result = await Store.find({});
  return result;
};

exports.getStoreByIdService = async (id) => {
  const result = await Store.findById({ _id: id });
  return result;
};

exports.updateStoreByIdService = async (id, data) => {
  const result = await Store.updateOne({ _id: id }, { $set: { data } });
  return result;
};
