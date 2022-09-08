import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editInvestment,
  getInvestmentById,
} from "../../../features/investment/investmentSlice";
import Spinner from "../../atoms/Spinner";
import SpinnerOverlay from "../../atoms/SpinnerOverlay";

function EditInvestForm() {
  const [formData, setFormData] = useState({
    investName: "",
    expectedRate: 0,
    expectedProfit: 0,
    unit: "",
  });

  const {
    investName = "",
    expectedRate = 0,
    expectedProfit = 0,
    unit = "",
  } = formData;

  const { investId } = useParams();
  const { investmentById, isLoading } = useSelector(
    (state) => state.investment
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvestmentById(investId));
  }, []);

  useEffect(() => {
    if (investmentById) {
      setFormData({
        investName: investmentById.investName,
        expectedRate: investmentById.expectedRate,
        expectedProfit: investmentById.expectedProfit,
        unit: investmentById.unit,
      });
    }
  }, [investmentById]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const investmentData = {
      investId,
      investName,
      expectedRate,
      expectedProfit,
      unit,
    };

    if (!investName || !expectedRate || !expectedProfit || !unit) {
      toast.error("Mohon isi semua data! 😣");
    } else {
      dispatch(editInvestment(investmentData));
      navigate(-1);
    }
  };

  if (isLoading) return <SpinnerOverlay />;
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
            value={investName}
            autoComplete="off"
            placeholder="jenis investasi/tujuan investasi/dll"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expectedRate">Suku bunga yang diharapkan</label>

          <div className="with-prefix">
            <div className="prefix">%</div>
            <input
              type="number"
              className="form-control"
              id="expectedRate"
              name="expectedRate"
              value={expectedRate}
              autoComplete="off"
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
              className="form-control"
              id="expectedProfit"
              name="expectedProfit"
              value={expectedProfit}
              autoComplete="off"
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
    </div>
  );
}

export default EditInvestForm;
