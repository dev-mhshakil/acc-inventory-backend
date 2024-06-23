const {
  createStoreService,
  getStoreService,
  updateStoreByIdService,
  getStoreByIdService,
} = require("../services/store.service");

exports.createStore = async (req, res, next) => {
  try {
    const store = await createStoreService(req.body);
    res.status(201).json({
      status: "success",
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Cannot create the store",
      error: error.message,
    });
  }
};

exports.getAllStore = async (req, res, next) => {
  try {
    const store = await getStoreService();
    res.status(201).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Cannot find the store by id",
      error: error.message,
    });
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStoreByIdService(id);
    res.status(201).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Cannot update the store",
      error: error.message,
    });
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await updateStoreByIdService(id, req.body);
    res.status(201).json({
      status: "success",
      message: "Store updated successfully",
      data: store,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Cannot update the store",
      error: error.message,
    });
  }
};
