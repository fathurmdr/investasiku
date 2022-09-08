import callAPI from "../callAPI";

const API_URL = "/api/users/";

// User sign up
const signup = async (userData) => {
  const response = await callAPI({
    url: API_URL,
    method: "POST",
    payload: userData,
  });

  return response;
};

// User login
const login = async (userData) => {
  const response = await callAPI({
    url: API_URL + "login",
    method: "POST",
    payload: userData,
  });

  if (response) {
    const tokenBase64 = btoa(response.token);
    localStorage.setItem("token", JSON.stringify(tokenBase64));
  }

  return response;
};

// User logout
const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
