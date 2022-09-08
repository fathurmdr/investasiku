const mongoose = require("mongoose");
const investmentDetailSchema = require("./investmentDetailModel");

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    investName: {
      type: String,
      required: [true, "Please add a name"],
    },
    expectedRate: {
      type: Number,
      required: [true, "Please add expected rate"],
    },
    expectedProfit: {
      type: Number,
      required: [true, "Please add expected profit"],
    },
    unit: {
      type: String,
      required: [true, "Please add investment unit"],
    },
    investmentDetails: [investmentDetailSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investment", investmentSchema);
