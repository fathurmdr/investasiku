const mongoose = require("mongoose");

const investmentDetailSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    buyBack: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = investmentDetailSchema;
