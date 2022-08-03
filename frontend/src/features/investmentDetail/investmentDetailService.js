import axios from "axios";

const API_URL = "/api/investments/";

//Get user investment details
const getInvestmentDetails = async (investId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + investId + "/details", config);

  return response.data;
};

// Add buy back
const addBuyback = async (investId, buyBack, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + investId + "/details/buyback",
    { buy_back: buyBack, date: new Date() },
    config
  );

  return response.data;
};

// Buy investment
const buyInvestment = async (investId, buyForm, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + investId + "/details/buy",
    buyForm,
    config
  );

  return response.data;
};

// Sell investment
const sellInvestment = async (investId, sellForm, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + investId + "/details/sell",
    sellForm,
    config
  );

  return response.data;
};

// calculate rate
const calculateRate = async (investmentDetails, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/calculateRate",
    { investment_detail: investmentDetails },
    config
  );

  return response.data;
};

// Edit investment detail
const editInvestmentDetail = async (
  investId,
  investDetailId,
  editInvestDetailForm,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + investId + "/details/" + investDetailId,
    editInvestDetailForm,
    config
  );

  return response.data;
};

// Delete investment detail
const deleteInvestmentDetail = async (investId, investDetailId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + investId + "/details/" + investDetailId,
    config
  );

  return response.data;
};

const investmentDetailService = {
  getInvestmentDetails,
  addBuyback,
  buyInvestment,
  sellInvestment,
  calculateRate,
  editInvestmentDetail,
  deleteInvestmentDetail,
};

export default investmentDetailService;
