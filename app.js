const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.route");

app.get("/", (req, res) => {
  console.log("Route is working");
});

// posting a new product to database
app.use("/api/v1/product", productRoute);

module.exports = app;
