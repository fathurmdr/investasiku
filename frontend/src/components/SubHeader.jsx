import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function SubHeader(props) {
  const navigate = useNavigate();
  return (
    <header className="sub-header" onClick={() => navigate(-1)}>
      <RiArrowLeftSLine />
      <h1>{props.subHeaderName}</h1>
    </header>
  );
}

export default SubHeader;
