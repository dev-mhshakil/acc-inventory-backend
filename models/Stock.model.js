const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.ObjectId;

// schema design
const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
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
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
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
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status must be in-stock, out-of-stock or discontinued.",
      },
    },
    store: {
      name: {
        type: String,
        required: [true, "Please provide a store name"],
        trim: true,
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chittagong",
            "khulna",
            "rajshahi",
            "rangpur",
            "sylhet",
            "barishal",
            "mymensingh",
          ],
        },
        id: {
          type: ObjectId,
          ref: "Store",
          required: true,
        },
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: [true, "Please provide a store name"],
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
