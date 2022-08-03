const express = require("express");
const router = express.Router();
const {
  getInvestmentDetails,
  addBuyBack,
  buyInvestment,
  sellInvestment,
  updateInvestmentDetail,
  deleteInvestmentDetail,
} = require("../controllers/investmentDetailController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:investment/details", protect, getInvestmentDetails);
router.post("/:investment/details/buyback", protect, addBuyBack);
router.post("/:investment/details/buy", protect, buyInvestment);
router.post("/:investment/details/sell", protect, sellInvestment);
router
  .route("/:investment/details/:id")
  .put(protect, updateInvestmentDetail)
  .delete(protect, deleteInvestmentDetail);

module.exports = router;
