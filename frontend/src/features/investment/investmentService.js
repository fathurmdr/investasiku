import axios from "axios";

const API_URL = "/api/investments/";

// Create new investment
const createInvestment = async (investmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, investmentData, config);

  return response.data;
};

// Edit investment
const editInvestment = async (investmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + investmentData.investId,
    {
      invest_name: investmentData.invest_name,
      expected_rate: investmentData.expected_rate,
      expected_profit: investmentData.expected_profit,
      unit: investmentData.unit,
    },
    config
  );

  return response.data;
};

//Get user investments
const getInvestments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user investment
const deleteInvestment = async (investmentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + investmentId, config);

  return response.data;
};

const investmentService = {
  createInvestment,
  getInvestments,
  deleteInvestment,
  editInvestment,
};

export default investmentService;
