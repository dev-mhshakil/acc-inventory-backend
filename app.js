const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const categoryRoute = require("./routes/category.route");
const storeRoute = require("./routes/store.route");

app.get("/", (req, res) => {
  console.log("Route is working");
});

// posting a new product to database
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);

module.exports = app;
