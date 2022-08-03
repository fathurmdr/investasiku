import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Spinner from "../components/Spinner";
import SubHeader from "../components/SubHeader";
import { MdOutlineDateRange } from "react-icons/md";
import { sellInvestment } from "../features/investmentDetail/investmentDetailSlice";

function SellInvestment() {
  const [investmentById, setInvestmentById] = useState(undefined);
  const [sellForm, setSellForm] = useState({
    buy_back: "",
    date: new Date(),
    sell_price: "",
    quantity: "",
  });

  const { buy_back, date, sell_price, quantity } = sellForm;

  const { investId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { investments } = useSelector((state) => state.investment);
  const { isLoading } = useSelector((state) => state.investmentDetail);

  useEffect(() => {
    if (investments) {
      setInvestmentById(investments.filter((el) => el._id === investId)[0]);
    }
  }, [investments]);

  const onChange = (e) => {
    setSellForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      investId,
      sellForm,
    };

    if (!buy_back || !date || !sell_price || !quantity) {
      toast.error("Mohon isi semua data! 😣");
    } else {
      dispatch(sellInvestment(payload));
      navigate(-1);
    }
  };
  return (
    <>
      <SubHeader subHeaderName="Jual" />
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="date">Tanggal pembelian</label>
            <div className="with-prefix">
              <div className="prefix-svg">
                <MdOutlineDateRange />
              </div>
              <DatePicker
                id="date"
                name="date"
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
            <label htmlFor="sell_price">Harga jual</label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                className="form-control"
                id="sell_price"
                name="sell_price"
                value={sell_price}
                autoComplete="off"
                placeholder="pendapatan bersih dari penjualan"
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
                placeholder="kuantitas yang dijual"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="buy_back">Buy back</label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                className="form-control rate"
                id="buy_back"
                name="buy_back"
                value={buy_back}
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
