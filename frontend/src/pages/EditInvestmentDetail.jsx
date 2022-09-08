import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import SubHeader from "../components/SubHeader";
import { MdOutlineDateRange } from "react-icons/md";
import Spinner from "../components/atoms/Spinner";
import {
  editInvestmentDetail,
  getInvestmentById,
} from "../features/investment/investmentSlice";
import SpinnerOverlay from "../components/atoms/SpinnerOverlay";

function EditInvestmentDetail() {
  const [formData, setFormData] = useState({
    buyBack: "",
    date: new Date(),
    price: "",
    quantity: "",
  });

  const { buyBack, date, price, quantity } = formData;
  const { investId, investDetailId } = useParams();
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

  useEffect(() => {
    if (investmentById._id) {
      const investmentDetailById = investmentById.investmentDetails.filter(
        (el) => el._id === investDetailId
      )[0];
      setFormData({
        ...investmentDetailById,
        date: new Date(investmentDetailById.date),
      });
    }
  }, [investmentById]);

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      investId,
      investDetailId,
      formData,
    };

    if (!buyBack || !date || !price || !quantity) {
      toast.error("Mohon isi semua data! 😣");
    } else {
      dispatch(editInvestmentDetail(payload));
      console.log(payload);
      navigate(-1);
    }
  };

  if (isLoading) return <SpinnerOverlay />;

  return (
    <>
      <SubHeader subHeaderName="Edit Investment Detail" />
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="expected_rate">Tanggal</label>

            <div className="with-prefix">
              <div className="prefix-svg">
                <MdOutlineDateRange />
              </div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    date,
                  }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="price">Harga Beli/Jual</label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={price}
                autoComplete="off"
                placeholder="total harga pembelian"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Kuantitas Beli/Jual</label>
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

export default EditInvestmentDetail;
