import { RiAddCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function AddInvestmentButton() {
  return (
    <div className="add-investment">
      <Link to="addInvestment">
        <RiAddCircleFill />
      </Link>
    </div>
  );
}

export default AddInvestmentButton;
