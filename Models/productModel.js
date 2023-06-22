const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "A product must have a name"],
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: [true, "A product must have price"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    length: {
      type: Number,
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    tag: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    virtuals: {
      salePrice: {
        get() {
          if (this.discount > 0) {
            return Math.round(this.price - (this.price * this.discount) / 100);
          } else {
            return null;
          }
        },
      },
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
