import { FaQuestionCircle, FaRegQuestionCircle } from "react-icons/fa";
import {
  RiLineChartFill,
  RiLineChartLine,
  RiPieChart2Fill,
  RiPieChart2Line,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import NavList from "./NavList";

function Navbar(props) {
  const { currentPage = "" } = props;
  return (
    <div className="navContainer">
      <NavList
        href="/dashboard"
        title="Dashboard"
        active={currentPage === "dashboard"}
        iconFill={<RiPieChart2Fill />}
        iconLine={<RiPieChart2Line />}
      />
      <NavList
        href="/investments"
        title="Investment"
        active={currentPage === "investments"}
        iconFill={<RiLineChartFill />}
        iconLine={<RiLineChartLine />}
      />
      <NavList
        href="/simulation"
        title="Simulation"
        active={currentPage === "simulation"}
        iconFill={<FaQuestionCircle />}
        iconLine={<FaRegQuestionCircle />}
      />
      <NavList
        href="/profile"
        title="Profile"
        active={currentPage === "profile"}
        iconFill={<RiUser3Fill />}
        iconLine={<RiUser3Line />}
      />
    </div>
  );
}

export default Navbar;
