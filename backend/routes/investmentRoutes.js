const express = require("express");
const router = express.Router();
const {
  getInvestments,
  getInvestmentDetails,
  createInvestment,
  updateInvestment,
  deleteInvestment,
  addBuyBack,
  buyInvestment,
  sellInvestment,
  updateInvestmentDetail,
  deleteInvestmentDetail,
  resetInvestmentDetails,
} = require("../controllers/investmentController");
const { protect } = require("../middleware/authMiddleware");

// protect middleware
router.use(protect);

// investment routes
router.post("/", createInvestment);
router.get("/", getInvestments);
router.put("/:id", updateInvestment);
router.delete("/:id", deleteInvestment);

// investment detail routes
router.post("/:id/addBuyBack", addBuyBack);
router.post("/:id/buy", buyInvestment);
router.post("/:id/sell", sellInvestment);
router.get("/:id", getInvestmentDetails);
router.put("/:id/:detailId", updateInvestmentDetail);
router.delete("/:id/reset", resetInvestmentDetails);
router.delete("/:id/:detailId", deleteInvestmentDetail);

module.exports = router;
