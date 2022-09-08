import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthFooter from "../components/atoms/AuthFooter";
import BannerLogo from "../components/molecules/BannerLogo";
import LoginForm from "../components/organisms/LoginForm";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  return (
    <>
      <BannerLogo />
      <LoginForm />
      <AuthFooter />
    </>
  );
}

export default Login;
