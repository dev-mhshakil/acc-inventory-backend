const mongoose = require("mongoose");

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this course."],
      trim: true,
      minLength: [3, "Name must be at least 5 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [10, "Price must be at least 10"],
      max: [1000, "Price must be less than 1000"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "Unit must be kg, litre or pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Quantity must be an integer",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status must be active or inactive",
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
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

productSchema.post("save", function (doc, next) {
  console.log("After saving");

  next();
});

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// SCHEMA -> MODEL -> QUERY

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
