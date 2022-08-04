// import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RiLineChartFill,
  RiLineChartLine,
  RiPieChart2Fill,
  RiPieChart2Line,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import {
  FaLightbulb,
  FaQuestionCircle,
  FaRegLightbulb,
  FaRegQuestionCircle,
} from "react-icons/fa";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="navContainer">
      <button className="nav" onClick={() => navigate("/")}>
        {location.pathname === "/" ? <RiPieChart2Fill /> : <RiPieChart2Line />}
        <p>Dashboard</p>
      </button>
      <button className="nav" onClick={() => navigate("/investments")}>
        {location.pathname === "/investments" ? (
          <RiLineChartFill />
        ) : (
          <RiLineChartLine />
        )}
        <p>Investments</p>
      </button>
      <button className="nav" onClick={() => navigate("/savings")}>
        {location.pathname === "/savings" ? (
          <FaQuestionCircle />
        ) : (
          <FaRegQuestionCircle />
        )}
        <p>Simulation</p>
      </button>
      <button className="nav" onClick={() => navigate("/profile")}>
        {location.pathname === "/profile" ? <RiUser3Fill /> : <RiUser3Line />}
        <p>Profile</p>
      </button>
    </div>
  );
}

export default Navigation;
