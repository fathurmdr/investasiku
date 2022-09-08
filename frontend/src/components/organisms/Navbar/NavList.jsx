import { Link } from "react-router-dom";

function NavList(props) {
  const { href = "/", active, iconFill, iconLine, title } = props;
  return (
    <Link to={href} className="nav">
      {active ? iconFill : iconLine}
      <p>{title}</p>
    </Link>
  );
}

export default NavList;
