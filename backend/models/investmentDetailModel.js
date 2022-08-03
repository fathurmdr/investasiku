const mongoose = require("mongoose");

const investmentDetailSchema = mongoose.Schema(
  {
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Investment",
    },
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
    buy_back: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InvestmentDetail", investmentDetailSchema);
