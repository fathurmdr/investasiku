import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import SubHeader from "../components/SubHeader";
import { MdOutlineDateRange } from "react-icons/md";
import Spinner from "../components/atoms/Spinner";
import {
  getInvestmentById,
  sellInvestment,
} from "../features/investment/investmentSlice";
import SpinnerOverlay from "../components/atoms/SpinnerOverlay";

function SellInvestment() {
  const [sellForm, setSellForm] = useState({
    buyBack: "",
    date: new Date(),
    sellPrice: "",
    quantity: "",
  });

  const { buyBack, date, sellPrice, quantity } = sellForm;
  const { investId } = useParams();

  const { investmentById, isLoading } = useSelector(
    (state) => state.investment
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!investmentById._id) {
      dispatch(getInvestmentById(investId));
    }
  }, []);

  const onChange = (event) => {
    setSellForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      investId,
      sellForm,
    };

    if (!buyBack || !date || !sellPrice || !quantity) {
      toast.error("Mohon isi semua data! 😣");
    } else {
      dispatch(sellInvestment(payload));
      navigate(-1);
    }
  };
  if (isLoading) return <SpinnerOverlay />;
  return (
    <>
      <SubHeader subHeaderName="Jual" />
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="expected_rate">Tanggal pembelian</label>

            <div className="with-prefix">
              <div className="prefix-svg">
                <MdOutlineDateRange />
              </div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) =>
                  setSellForm((prevState) => ({
                    ...prevState,
                    date,
                  }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="sellPrice">Harga jual</label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                className="form-control"
                id="sellPrice"
                name="sellPrice"
                value={sellPrice}
                autoComplete="off"
                placeholder="total harga pembelian"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Kuantitas</label>
            <div className="with-prefix">
              <div className="prefix">{investmentById?.unit}</div>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={quantity}
                autoComplete="off"
                placeholder="kuantitas yang dibeli"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="buyBack">Buy back</label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                className="form-control rate"
                id="buyBack"
                name="buyBack"
                value={buyBack}
                autoComplete="off"
                placeholder={`harga buy back per ${investmentById?.unit}`}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              {isLoading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default SellInvestment;
