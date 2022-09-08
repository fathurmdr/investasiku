const asyncHandler = require("express-async-handler");
const findRate = require("../../my_modules/findRate");
const Investment = require("../models/investmentModel");

// @desc    Create investment
// @route   POST /api/investments
// @access  Private
const createInvestment = asyncHandler(async (req, res) => {
  if (
    !req.body.investName ||
    !req.body.expectedRate ||
    !req.body.expectedProfit ||
    !req.body.unit
  ) {
    res.status(400);
    throw new Error("please fill all fields!");
  }

  // Check for user exists
  if (!req.user.id) {
    res.status(401);
    throw new Error("User not found");
  }

  const investment = await Investment.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(200).json({
    data: investment,
  });
});

// @desc    Get investments
// @route   GET /api/investments
// @access  Private
const getInvestments = asyncHandler(async (req, res) => {
  const investments = await Investment.find({ user: req.user.id }).select(
    "-investmentDetails"
  );

  res.status(200).json({
    data: investments,
  });
});

// @desc    Update investment
// @route   PUT /api/investments/:id
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

  res.status(200).json({
    data: updatedInvestment,
  });
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

  res.status(200).json({ data: { id: req.params.id } });
});

// @desc    Add buy back
// @route   POST /api/investments/:id/addBuyBack
// @access  Private
const addBuyBack = asyncHandler(async (req, res) => {
  if (!req.body.buyBack) {
    res.status(400);
    throw new Error("please add buy back field");
  }

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

  // Add Buy Back to investment_details field
  investment.investmentDetails.push(req.body);
  investment.save();

  const investmentDetail = investment.investmentDetails.slice(-1)[0];

  res.status(200).json({ data: investmentDetail });
});

// @desc    Buy investment
// @route   POST /api/investments/:id/buy
// @access  Private
const buyInvestment = asyncHandler(async (req, res) => {
  if (!req.body.buyBack || !req.body.quantity || !req.body.buyPrice) {
    res.status(400);
    throw new Error("please fill all fields!");
  }

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

  // Add Buy Investment to investment_details field
  investment.investmentDetails.push({
    buyBack: req.body.buyBack,
    price: req.body.buyPrice,
    quantity: req.body.quantity,
    date: req.body.date,
  });
  investment.save();

  const investmentDetail = investment.investmentDetails.slice(-1)[0];

  res.status(200).json({ data: investmentDetail });
});

// @desc    Sell investment
// @route   POST /api/investments/:id/sell
// @access  Private
const sellInvestment = asyncHandler(async (req, res) => {
  if (!req.body.buyBack || !req.body.quantity || !req.body.sellPrice) {
    res.status(400);
    throw new Error("please fill all fields!");
  }

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

  // Add Sell Investment to investment_details field
  investment.investmentDetails.push({
    buyBack: req.body.buyBack,
    price: -parseFloat(req.body.sellPrice),
    quantity: -parseFloat(req.body.quantity),
    date: req.body.date,
  });
  investment.save();

  const investmentDetail = investment.investmentDetails.slice(-1)[0];

  res.status(200).json({ data: investmentDetail });
});

// @desc    Get investment details
// @route   GET /api/investments/:id
// @access  Private
const getInvestmentDetails = asyncHandler(async (req, res) => {
  const investment = await Investment.findOne({
    user: req.user.id,
    _id: req.params.id,
  });

  let { investmentDetails } = investment.toObject();
  if (investmentDetails.length === 0) {
    return res.status(200).json({
      data: { ...investment.toObject() },
    });
  }

  investmentDetails = investmentDetails.sort((a, b) => a.date - b.date);

  const lastDate = investmentDetails.slice(-1)[0].date;
  const stock = investmentDetails.reduce(
    (stock, value) => stock + value.quantity,
    0
  );
  const totalPurchases = investmentDetails.reduce(
    (totalPurchases, value) =>
      totalPurchases + (value.price > 0 ? value.price : 0),
    0
  );
  const totalSales = investmentDetails.reduce(
    (totalSales, value) => totalSales + (value.price < 0 ? -value.price : 0),
    0
  );
  const lastBuyback = investmentDetails.filter(
    (value) => value.date === lastDate
  )[0].buyBack;
  const stockToBuyback = stock * lastBuyback;
  const investmentRate = findRate([
    ...investmentDetails,
    { price: -lastBuyback * stock, date: lastDate },
  ]);

  res.status(200).json({
    data: {
      ...investment.toObject(),
      investmentDetails,
      investmentRate,
      lastDate,
      stock,
      totalPurchases,
      totalSales,
      stockToBuyback,
    },
  });
});

// @desc    Update investment detail
// @route   PUT /api/investments/:id/:detailId
// @access  Private
const updateInvestmentDetail = asyncHandler(async (req, res) => {
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

  // update investment detail
  investment.investmentDetails.id(req.params.detailId).buyBack =
    req.body.buyBack;
  investment.investmentDetails.id(req.params.detailId).date = req.body.date;
  investment.investmentDetails.id(req.params.detailId).price = req.body.price;
  investment.investmentDetails.id(req.params.detailId).quantity =
    req.body.quantity;
  investment.save();

  const updatedInvestmentDetail = investment.investmentDetails.id(
    req.params.detailId
  );

  res.status(200).json({ data: updatedInvestmentDetail });
});

// @desc    Delete investment detail by id
// @route   DELETE /api/investments/:id/:detailId
// @access  Private
const deleteInvestmentDetail = asyncHandler(async (req, res) => {
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

  // remove investment detail
  investment.investmentDetails.id(req.params.detailId).remove();
  investment.save();

  res.status(200).json({ data: { id: req.params.detailId } });
});

// @desc    Reset investment details data
// @route   DELETE /api/investments/:id/reset
// @access  Private
const resetInvestmentDetails = asyncHandler(async (req, res) => {
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

  // remove investment detail
  investment.investmentDetails = [];
  await investment.save();

  res.status(200).json({ data: investment });
});

module.exports = {
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment,
  addBuyBack,
  buyInvestment,
  sellInvestment,
  getInvestmentDetails,
  updateInvestmentDetail,
  deleteInvestmentDetail,
  resetInvestmentDetails,
};
