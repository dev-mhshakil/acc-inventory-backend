const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this category"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    description: String,
    imageURL: {
      type: String,
      required: [true, "Please provide an image for this category"],
      validate: [validator.isURL, "Please provide a valid URL"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
