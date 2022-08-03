import React, { useEffect, useState } from "react";
import {
  RiArrowLeftSLine,
  RiDeleteBin5Line,
  RiEdit2Line,
} from "react-icons/ri";
import { MdOutlineSell, MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInvestments } from "../features/investment/investmentSlice";
import {
  addBuyback,
  calculateRate,
  deleteInvestmentDetail,
  getInvestmentDetails,
  reset,
} from "../features/investmentDetail/investmentDetailSlice";
import { toast } from "react-toastify";

function InvestmentDetail() {
  // array investDetails
  // investment

  // lastDate (lastInvestDetails.date)
  // buyBack
  // stock (totalqty sum(investDetails.qty))
  // unit (investment.unit)
  // totalPembelian (sum(investDetails.harga+))
  // totalPenjualan (sum(investDetails.harga-))
  // sukuBunga (calculateRate(investDetails))
  // stockBuyback (stock * lastBuyback)

  const [investmentById, setInvestmentById] = useState(undefined);
  const [investmentData, setInvestmentData] = useState({
    investName: "",
    lastDate: "",
    buyBack: "",
    stock: 0,
    unit: "",
    totalPembelian: 0,
    totalPenjualan: 0,
    sukuBunga: 0,
    stockBuyback: 0,
  });

  const {
    investName,
    lastDate,
    buyBack,
    stock,
    unit,
    totalPembelian,
    totalPenjualan,
    sukuBunga,
    stockBuyback,
  } = investmentData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { investId } = useParams();
  const { investments } = useSelector((state) => state.investment);
  const { investmentDetails, rates } = useSelector(
    (state) => state.investmentDetail
  );

  useEffect(() => {
    dispatch(getInvestmentDetails({ investId }));
    dispatch(getInvestments());
  }, []);

  useEffect(() => {
    if (investments) {
      setInvestmentById(investments.filter((el) => el._id === investId)[0]);
    }

    if (investmentById && investmentDetails) {
      setInvestmentData((prevState) => ({
        ...prevState,
        investName: investmentById.invest_name,
        lastDate: investmentDetails.slice(-1)[0]?.date
          ? new Date(investmentDetails.slice(-1)[0].date)
          : "",
        stock: investmentDetails.reduce(
          (result, el) => result + el.quantity,
          0
        ),
        unit: investmentById.unit,
        totalPembelian: investmentDetails.reduce(
          (result, el) => result + (el.price > 0 ? el.price : 0),
          0
        ),
        totalPenjualan: investmentDetails.reduce(
          (result, el) => result + (el.price < 0 ? el.price * -1 : 0),
          0
        ),
        stockBuyback:
          investmentDetails.reduce((result, el) => result + el.quantity, 0) *
          investmentDetails.slice(-1)[0]?.buy_back,
      }));
    }
  }, [investmentDetails, investments]);

  useEffect(() => {
    if (investmentDetails.length > 0 && lastDate !== "") {
      dispatch(
        calculateRate([
          ...investmentDetails,
          {
            date: lastDate,
            price: -stockBuyback,
          },
        ])
      );
    } else {
      setInvestmentData((prevState) => ({
        ...prevState,
        sukuBunga: 0,
      }));
    }
  }, [investmentDetails, lastDate, stockBuyback]);

  useEffect(() => {
    setInvestmentData((prevState) => ({
      ...prevState,
      sukuBunga: rates.rateMonth ? rates.rateMonth : 0,
    }));
  }, [rates]);

  const onChange = (e) => {
    setInvestmentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      investId,
      buyBack,
    };

    if (!buyBack) {
      toast.error("Mohon isi data buy back! 😣");
    } else {
      dispatch(addBuyback(payload));
      dispatch(getInvestmentDetails());
      setInvestmentData((prevState) => ({
        ...prevState,
        buyBack: "",
      }));
    }
  };

  return (
    <>
      <header
        className="sub-header"
        onClick={() => {
          navigate(-1);
          dispatch(reset());
        }}
      >
        <RiArrowLeftSLine />
        <h1>{investName}</h1>
      </header>

      <section className="investment-detail">
        <p className="last-date">
          Data terakhir:{" "}
          {lastDate !== ""
            ? lastDate.toLocaleString("id-ID", {
                dateStyle: "long",
              })
            : "Data belum tersedia"}
        </p>
        <form className="add-buyback" onSubmit={onSubmit}>
          <label htmlFor="buyBack">Buy back (per {unit && unit})</label>
          <div className="input-btn-buyback">
            <input
              type="number"
              id="buyBack"
              name="buyBack"
              value={buyBack}
              autoComplete="off"
              placeholder="Rp"
              onChange={onChange}
            />
            <button type="submit">
              Perbarui
              {/* {isLoading ? <Spinner /> : "Login"} */}
            </button>
          </div>
        </form>
        <div className="last-detail">
          <div className="left">
            <div className="stock">
              <h3>Stock</h3>
              <p>
                {stock} {unit}
                {/* 15 gr */}
              </p>
            </div>
            <div className="total-pembelian">
              <h3>Total pembelian</h3>
              <p>
                {totalPembelian.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
                {/* Rp 18.296.647,5 */}
              </p>
            </div>
            <div className="total-penjualan">
              <h3>Total penjualan</h3>
              <p>
                {totalPenjualan.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
                {/* Rp 4.300.000,- */}
              </p>
            </div>
          </div>
          <div className="right">
            <div
              className={
                "suku-bunga " +
                (parseFloat(sukuBunga * 100).toFixed(2) >=
                investmentById?.expected_rate
                  ? "bg-green"
                  : parseFloat(sukuBunga * 100).toFixed(2) > 0
                  ? "bg-yellow"
                  : "bg-red")
              }
            >
              <h3>Suku bunga</h3>
              <p>{parseFloat(sukuBunga * 100).toFixed(2)} %</p>
            </div>
            <div
              className={
                "stock-buyback " +
                (stockBuyback + totalPenjualan - totalPembelian >=
                investmentById?.expected_profit
                  ? "bg-green"
                  : stockBuyback + totalPenjualan - totalPembelian > 0
                  ? "bg-yellow"
                  : "bg-red")
              }
            >
              <h3>Stock to Buy Back</h3>
              <p>
                {stockBuyback
                  ? stockBuyback.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "Rp 0,00"}
                {/* Rp 12.930.000,- */}
              </p>
            </div>
          </div>
        </div>
        <div className="buy-or-sell">
          <button onClick={() => navigate("./buy")}>
            <MdOutlineShoppingCart /> Beli
          </button>
          <button onClick={() => navigate("./sell")}>
            <MdOutlineSell />
            Jual
          </button>
        </div>
        <div className="table-detail">
          <table className="">
            <thead className="">
              <tr>
                <th>Tanggal</th>
                <th>Kuantitas Beli/Jual</th>
                <th>Harga Beli/Jual</th>
                <th>
                  Buy back <span>(per {unit})</span>
                </th>
                {/* <th>Suku bunga</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {investmentDetails &&
                investmentById &&
                investmentDetails.map((el, index) => (
                  <tr key={index}>
                    <td className="text-xs font-normal py-1">
                      {new Date(el.date).toLocaleString("id-ID", {
                        dateStyle: "medium",
                      })}
                    </td>
                    <td className="text-xs font-normal py-1">
                      {el.quantity} {investmentById.unit}
                    </td>
                    <td className="text-xs font-normal py-1">
                      {el.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="text-xs font-normal py-1">
                      {el.buy_back.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    {/* <td className="text-xs font-normal py-1">-4.6%</td> */}
                    <td className="table-action">
                      <RiEdit2Line
                        className="edit"
                        onClick={() => navigate("./edit/" + el._id)}
                      />
                      <RiDeleteBin5Line
                        className="delete"
                        onClick={() =>
                          dispatch(
                            deleteInvestmentDetail({
                              investId,
                              investDetailId: el._id,
                            })
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {investmentDetails.length === 0 && <div> Data belum tersedia</div>}
        </div>
      </section>
    </>
  );
}

export default InvestmentDetail;
