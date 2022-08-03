import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Spinner from "../components/Spinner";
import SubHeader from "../components/SubHeader";
import { MdOutlineDateRange } from "react-icons/md";
import { editInvestmentDetail } from "../features/investmentDetail/investmentDetailSlice";

function EditInvestmentDetail() {
  const { investId, investDetailId } = useParams();
  const { investments } = useSelector((state) => state.investment);
  const { isLoading, investmentDetails } = useSelector(
    (state) => state.investmentDetail
  );
  const [investmentById, setInvestmentById] = useState(undefined);
  const [editInvestDetailForm, setEditInvestDetailForm] = useState({
    ...investmentDetails.filter((el) => el._id === investDetailId)[0],
    // buy_back: "",
    date: new Date(
      investmentDetails.filter((el) => el._id === investDetailId)[0].date
    ),
    // price: "",
    // quantity: "",
  });

  const { buy_back, date, price, quantity } = editInvestDetailForm;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (investments) {
      setInvestmentById(investments.filter((el) => el._id === investId)[0]);
      setEditInvestDetailForm((prevState) => ({
        ...prevState,
        investment: investId,
      }));
    }
  }, [investments]);

  const onChange = (e) => {
    setEditInvestDetailForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      investId,
      investDetailId,
      editInvestDetailForm,
    };

    if (!buy_back || !date || !price || !quantity) {
      toast.error("Mohon isi semua data! 😣");
    } else {
      dispatch(editInvestmentDetail(payload));
      navigate(-1);
    }
  };
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
                  setEditInvestDetailForm((prevState) => ({
                    ...prevState,
                    date,
                  }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="buy_price">Harga Beli/Jual</label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                className="form-control"
                id="buy_price"
                name="buy_price"
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

export default EditInvestmentDetail;
