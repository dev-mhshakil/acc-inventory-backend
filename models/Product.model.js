const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this course."],
      trim: true,
      unique: [true, "Please provide a unique name for this course."],
      lowercase: true,
      minLength: [3, "Name must be at least 5 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "Unit must be kg, litre, pcs or bag",
      },
    },
    supplier: {
      type: ObjectId,
      ref: "Supplier",
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide a valid URLs",
        },
      },
    ],
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  { timestamps: true }
);

// mongoose middlewares for saving data: pre / post

productSchema.pre("save", function (next) {
  console.log("Before saving");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
