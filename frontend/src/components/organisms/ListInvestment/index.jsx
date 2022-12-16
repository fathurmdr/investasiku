/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getInvestments } from "../../../features/investment/investmentSlice";
import SpinnerOverlay from "../../atoms/SpinnerOverlay";

import MenuOption from "../../molecules/MenuOption";

function ListInvestment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { investments, isLoading, isError, message } = useSelector(
    (state) => state.investment
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getInvestments());
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  return (
    <div className="container-with-header">
      {isLoading ? (
        <SpinnerOverlay />
      ) : (
        <div className="list-menu">
          {investments.map((el) => (
            <li key={el._id}>
              <div
                onClick={() => navigate(`./detail/${el._id}`)}
                className="detail"
              >
                <p>{el.investName}</p>
                <RiArrowRightSLine />
              </div>
              {<MenuOption _id={el._id} />}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListInvestment;
