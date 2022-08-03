const asyncHandler = require("express-async-handler");
const InvestmentDetail = require("../models/investmentDetailModel");
const Investment = require("../models/investmentModel");
const findRate = require("../../my_modules/findRate");

// @desc    Get investment details
// @route   GET /api/investments/:investment/details
// @access  Private
const getInvestmentDetails = asyncHandler(async (req, res) => {
  const investmentDetails = await InvestmentDetail.find({
    investment: req.params.investment,
  });

  res.status(200).json(investmentDetails);
});

// @desc    Add Buy Back
// @route   POST /api/investments/:investment/details/buyback
// @access  Private
const addBuyBack = asyncHandler(async (req, res) => {
  if (!req.body.buy_back) {
    res.status(400);
    throw new Error("please add buy back field");
  }

  const investment = await Investment.findById(req.params.investment);

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

  const investmentDetail = await InvestmentDetail.create({
    ...req.body,
    investment: req.params.investment,
  });

  res.status(200).json(investmentDetail);
});

// @desc    Buy investment
// @route   POST /api/investments/:investment/details/buy
// @access  Private
const buyInvestment = asyncHandler(async (req, res) => {
  if (!req.body.buy_back || !req.body.quantity || !req.body.buy_price) {
    res.status(400);
    throw new Error("please fill all fields!");
  }

  const investment = await Investment.findById(req.params.investment);

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

  const investmentDetail = await InvestmentDetail.create({
    buy_back: req.body.buy_back,
    price: req.body.buy_price,
    quantity: req.body.quantity,
    date: req.body.date,
    investment: req.params.investment,
  });

  res.status(200).json(investmentDetail);
});

// @desc    Buy investment
// @route   POST /api/investments/:investment/details/buy
// @access  Private
const sellInvestment = asyncHandler(async (req, res) => {
  if (!req.body.buy_back || !req.body.quantity || !req.body.sell_price) {
    res.status(400);
    throw new Error("please fill all fields!");
  }

  const investment = await Investment.findById(req.params.investment);

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

  const investmentDetail = await InvestmentDetail.create({
    buy_back: req.body.buy_back,
    price: -parseFloat(req.body.sell_price),
    quantity: -parseFloat(req.body.quantity),
    date: req.body.date,
    investment: req.params.investment,
  });

  res.status(200).json(investmentDetail);
});

// @desc    Update investment detail
// @route   PUT /api/investments/:investment/details/:id
// @access  Private
const updateInvestmentDetail = asyncHandler(async (req, res) => {
  const investmentDetail = await InvestmentDetail.findById(req.params.id);
  const investment = await Investment.findById(req.params.investment);

  if (!investmentDetail) {
    res.status(400);
    throw new Error("investment detail not found");
  }

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

  const updatedInvestmentDetail = await InvestmentDetail.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedInvestmentDetail);
});

// @desc    Delete investment detail
// @route   DELETE /api/investments/:investment/details/:id
// @access  Private
const deleteInvestmentDetail = asyncHandler(async (req, res) => {
  const investmentDetail = await InvestmentDetail.findById(req.params.id);
  const investment = await Investment.findById(req.params.investment);

  if (!investmentDetail) {
    res.status(400);
    throw new Error("investment detail not found");
  }

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

  await investmentDetail.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getInvestmentDetails,
  addBuyBack,
  buyInvestment,
  sellInvestment,
  updateInvestmentDetail,
  deleteInvestmentDetail,
};
