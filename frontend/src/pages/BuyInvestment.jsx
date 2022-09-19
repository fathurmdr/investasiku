/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import SubHeader from "../components/SubHeader";
import { MdOutlineDateRange } from "react-icons/md";
import {
  buyInvestment,
  getInvestmentById,
} from "../features/investment/investmentSlice";
import Spinner from "../components/atoms/Spinner";
import SpinnerOverlay from "../components/atoms/SpinnerOverlay";

function BuyInvestment() {
  const [buyForm, setBuyForm] = useState({
    buyBack: "",
    date: new Date(),
    buyPrice: "",
    quantity: "",
  });

  const { buyBack, date, buyPrice, quantity } = buyForm;
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
    setBuyForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      investId,
      buyForm,
    };

    if (!buyBack || !date || buyPrice === "" || quantity === "") {
      toast.error("Mohon isi semua data! 😣");
    } else {
      await dispatch(buyInvestment(payload));
      navigate(-1);
    }
  };
  if (isLoading) return <SpinnerOverlay />;
  return (
    <>
      <SubHeader subHeaderName="Beli" />
      <section className="form container-with-header">
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
                  setBuyForm((prevState) => ({
                    ...prevState,
                    date,
                  }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="buyPrice">Harga beli</label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                pattern="[-+]?[0-9]*[.,]?[0-9]+"
                min={0}
                step={0.0001}
                className="form-control"
                id="buyPrice"
                name="buyPrice"
                value={buyPrice}
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
                pattern="[-+]?[0-9]*[.,]?[0-9]+"
                min={0}
                step={0.0001}
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
            <label htmlFor="buyBack">Harga jual per unit</label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                pattern="[-+]?[0-9]*[.,]?[0-9]+"
                min={0}
                step={0.0001}
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

export default BuyInvestment;
