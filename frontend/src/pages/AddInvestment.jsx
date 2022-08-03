import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import SubHeader from "../components/SubHeader";
import { createInvestment } from "../features/investment/investmentSlice";

function AddInvestment() {
  const [formData, setFormData] = useState({
    invest_name: "",
    expected_rate: "",
    expected_profit: "",
    unit: "",
  });

  const { invest_name, expected_rate, expected_profit, unit } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.investment);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const investmentData = {
      invest_name,
      expected_rate,
      expected_profit,
      unit,
    };

    if (!invest_name || !expected_rate || !expected_profit || !unit) {
      toast.error("Mohon isi semua data! 😣");
    } else {
      dispatch(createInvestment(investmentData));
      navigate(-1);
    }
  };
  return (
    <>
      <SubHeader subHeaderName="Add Investment" />
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="invest_name">Nama investasi</label>
            <input
              type="text"
              className="form-control rate"
              id="invest_name"
              name="invest_name"
              value={invest_name}
              autoComplete="off"
              placeholder="jenis investasi/tujuan investasi/dll"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expected_rate">Suku bunga yang diharapkan</label>

            <div className="with-prefix">
              <div className="prefix">%</div>
              <input
                type="number"
                className="form-control"
                id="expected_rate"
                name="expected_rate"
                value={expected_rate}
                autoComplete="off"
                // placeholder="%"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="expected_profit">
              Total keuntungan yang diharapkan
            </label>
            <div className="with-prefix">
              <div className="prefix">Rp</div>
              <input
                type="number"
                className="form-control"
                id="expected_profit"
                name="expected_profit"
                value={expected_profit}
                autoComplete="off"
                // placeholder="Rp."
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="unit">Satuan investasi</label>
            <input
              type="text"
              className="form-control"
              id="unit"
              name="unit"
              value={unit}
              autoComplete="off"
              placeholder="gr/slot/%/dll"
              onChange={onChange}
            />
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

export default AddInvestment;
