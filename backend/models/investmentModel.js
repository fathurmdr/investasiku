const mongoose = require("mongoose");

const investmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    invest_name: {
      type: String,
      required: [true, "Please add a name"],
    },
    expected_rate: {
      type: Number,
      required: [true, "Please add expected rate"],
    },
    expected_profit: {
      type: Number,
      required: [true, "Please add expected profit"],
    },
    unit: {
      type: String,
      required: [true, "Please add investment unit"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investment", investmentSchema);
