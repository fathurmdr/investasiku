const asyncHandler = require("express-async-handler");
const findRate = require("../../my_modules/findRate");
const investmentDetail = require("../models/investmentDetailModel");
const Investment = require("../models/investmentModel");

// @desc    Get investments
// @route   GET /api/investments
// @access  Private
const getInvestments = asyncHandler(async (req, res) => {
  const investments = await Investment.find({ user: req.user.id });

  res.status(200).json(investments);
});

// @desc    Set investment
// @route   POST /api/investments
// @access  Private
const setInvestment = asyncHandler(async (req, res) => {
  if (
    !req.body.invest_name ||
    !req.body.expected_rate ||
    !req.body.expected_profit ||
    !req.body.unit
  ) {
    res.status(400);
    throw new Error("please fill all fields!");
  }

  const investment = await Investment.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(200).json(investment);
});

// @desc    Update investment
// @route   PUT /api/investments
// @access  Private
const updateInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    res.status(400);
    throw new Error("investment not found");
  }

  // Check for user exists
  if (!req.user.id) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the data investment for logged in user
  if (investment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedInvestment = await Investment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedInvestment);
});

// @desc    Delete investment
// @route   DELETE /api/investments
// @access  Private
const deleteInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    res.status(400);
    throw new Error("Investment not found");
  }

  // Check for user exists
  if (!req.user.id) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the data investment for logged in user
  if (investment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await investment.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Calculate interest rate
// @route   POST /api/investments/calculateRate
// @access  Private
const calculateRate = asyncHandler(async (req, res) => {
  const investmentDetails = req.body.investment_detail;

  if (!investmentDetails) {
    res.status(400);
    throw new Error("investment details not found");
  }

  const calculatedRated = findRate(investmentDetails);

  res.status(200).json(calculatedRated);
});

module.exports = {
  getInvestments,
  setInvestment,
  updateInvestment,
  deleteInvestment,
  calculateRate,
};
