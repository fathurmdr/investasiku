const express = require("express");
const router = express.Router();
const {
  getInvestments,
  setInvestment,
  updateInvestment,
  deleteInvestment,
  calculateRate,
} = require("../controllers/investmentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getInvestments).post(protect, setInvestment);

router
  .route("/:id")
  .put(protect, updateInvestment)
  .delete(protect, deleteInvestment);

router.post("/calculateRate", protect, calculateRate);

module.exports = router;
