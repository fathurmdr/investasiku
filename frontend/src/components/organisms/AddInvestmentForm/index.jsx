import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createInvestment } from "../../../features/investment/investmentSlice";
import Spinner from "../../atoms/Spinner";

function AddInvestmentForm() {
  const [formData, setFormData] = useState({
    investName: "",
    expectedRate: "",
    expectedProfit: "",
    unit: "",
  });

  const { investName, expectedRate, expectedProfit, unit } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.investment);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const investmentData = {
      investName,
      expectedRate,
      expectedProfit,
      unit,
    };

    if (!investName || !expectedRate || !expectedProfit || !unit) {
      toast.error("Mohon isi semua data! 😣");
    } else {
      await dispatch(createInvestment(investmentData));
      navigate(-1);
    }
  };
  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="investName">Nama investasi</label>
          <input
            type="text"
            className="form-control rate"
            id="investName"
            name="investName"
            autoComplete="off"
            placeholder="jenis investasi/tujuan investasi/dll"
            value={investName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expectedRate">Imbal hasil yang diharapkan</label>

          <div className="with-prefix">
            <div className="prefix">%</div>
            <input
              type="number"
              pattern="[-+]?[0-9]*[.,]?[0-9]+"
              min={0}
              step={0.01}
              className="form-control"
              id="expectedRate"
              name="expectedRate"
              autoComplete="off"
              value={expectedRate}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="expectedProfit">
            Total keuntungan yang diharapkan
          </label>
          <div className="with-prefix">
            <div className="prefix">Rp</div>
            <input
              type="number"
              pattern="[-+]?[0-9]*[.,]?[0-9]+"
              min={0}
              step={0.0001}
              className="form-control"
              id="expectedProfit"
              name="expectedProfit"
              autoComplete="off"
              value={expectedProfit}
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
            autoComplete="off"
            placeholder="gr/slot/unit/dll"
            value={unit}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            {isLoading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInvestmentForm;
