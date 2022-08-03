import { useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListMenu from "../components/ListMenu";
import Navigation from "../components/Navigation";
import Spinner from "../components/Spinner";
import { getInvestments, reset } from "../features/investment/investmentSlice";

function Investment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { investments, isLoading, isError, message } = useSelector(
    (state) => state.investment
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getInvestments());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  return (
    <>
      <header className="header">
        <h1>Investments</h1>
      </header>

      <section className="list-investment">
        {isLoading ? (
          <Spinner />
        ) : (
          <ListMenu
            optionButton={true}
            menu={[
              ...investments.map((el) => ({
                menu: el.invest_name,
                link: "./detail/" + el._id,
                _id: el._id,
              })),
            ]}
          />
        )}
      </section>

      {/* Add button */}
      <div className="add-investment">
        <button onClick={() => navigate("./addInvestment")}>
          <RiAddCircleFill />
        </button>
      </div>

      {/* Navigation bar */}
      <Navigation />
    </>
  );
}

export default Investment;
