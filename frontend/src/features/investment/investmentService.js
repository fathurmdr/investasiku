import axios from "axios";
import callAPI from "../callAPI";

const API_URL = "/api/investments/";

// Create new investment
// URL: /api/investments/
const createInvestment = async (investmentData, token) => {
  const response = await callAPI({
    url: API_URL,
    method: "POST",
    payload: investmentData,
    token,
  });

  return response.data;
};

//Get user investments
// URL: /api/investments/
const getInvestments = async (token) => {
  const response = await callAPI({
    url: API_URL,
    method: "GET",
    token,
  });

  return response.data;
};

// Edit investment
// URL: /api/investments/:id
const editInvestment = async (investmentData, token) => {
  const response = await callAPI({
    url: API_URL + investmentData.investId,
    method: "PUT",
    payload: investmentData,
    token,
  });

  return response.data;
};

// Delete user investment
// URL: /api/investments/:id
const deleteInvestment = async (investmentId, token) => {
  const response = await callAPI({
    url: API_URL + investmentId,
    method: "DELETE",
    token,
  });

  return response.data;
};

// Get user investment by id
// URL: /api/investments/:id
const getInvestmentById = async (investmentId, token) => {
  const response = await callAPI({
    url: API_URL + investmentId,
    method: "GET",
    token,
  });

  return response.data;
};

// Add Buyback
// URL: /api/investments/:id/addBuyback
const addBuyback = async (investId, buyBack, date, token) => {
  const response = await callAPI({
    url: API_URL + investId + "/addBuyback",
    method: "POST",
    payload: { buyBack, date },
    token,
  });

  return response.data;
};

// Buy Investment
// URL: /api/investments/:id/buy
const buyInvestment = async (investId, buyForm, token) => {
  const response = await callAPI({
    url: API_URL + investId + "/buy",
    method: "POST",
    payload: buyForm,
    token,
  });

  return response.data;
};

// Sell Investment
// URL: /api/investments/:id/sell
const sellInvestment = async (investId, sellForm, token) => {
  const response = await callAPI({
    url: API_URL + investId + "/sell",
    method: "POST",
    payload: sellForm,
    token,
  });

  return response.data;
};

// Edit Investment Detail
// URL: /api/investments/:id/:detailId
const editInvestmentDetail = async (
  investId,
  investDetailId,
  formData,
  token
) => {
  const { buyBack, price, date, quantity } = formData;
  const response = await callAPI({
    url: API_URL + investId + "/" + investDetailId,
    method: "PUT",
    payload: { buyBack, price, date, quantity },
    token,
  });

  return response.data;
};

// Delete user investment detail
// URL: /api/investments/:id/:detailId
const deleteInvestmentDetail = async (investId, investDetailId, token) => {
  const response = await callAPI({
    url: API_URL + investId + "/" + investDetailId,
    method: "DELETE",
    token,
  });

  return response.data;
};

// Delete user investment detail
// URL: /api/investments/:id/:detailId
const resetInvestmentDetail = async (investId, token) => {
  const response = await callAPI({
    url: API_URL + investId + "/reset",
    method: "DELETE",
    token,
  });

  return response.data;
};

const investmentService = {
  createInvestment,
  getInvestments,
  deleteInvestment,
  editInvestment,
  getInvestmentById,
  addBuyback,
  buyInvestment,
  sellInvestment,
  editInvestmentDetail,
  deleteInvestmentDetail,
  resetInvestmentDetail,
};

export default investmentService;
