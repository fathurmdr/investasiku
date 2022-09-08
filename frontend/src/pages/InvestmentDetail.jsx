/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  RiArrowLeftSLine,
  RiDeleteBin5Line,
  RiEdit2Line,
} from "react-icons/ri";
import {
  MdOutlineRefresh,
  MdOutlineSell,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBuyback,
  deleteInvestmentDetail,
  getInvestmentById,
  reset,
  resetInvestmentDetail,
} from "../features/investment/investmentSlice";
import { toast } from "react-toastify";
import SpinnerOverlay from "../components/atoms/SpinnerOverlay";
import Modal from "../components/molecules/Modal";

function InvestmentDetail() {
  const [investmentData, setInvestmentData] = useState({
    investName: "",
    expectedRate: 0,
    expectedProfit: 0,
    unit: "",
    investmentDetails: [],
    investmentRate: {
      ratePerDay: 0,
      ratePerMonth: 0,
      ratePerYear: 0,
    },
    lastDate: "",
    stock: 0,
    totalPurchases: 0,
    totalSales: 0,
    stockToBuyback: 0,
  });
  const [formBuyback, setFormBuyback] = useState("");
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalReset, setIsModalReset] = useState(false);

  const {
    investName,
    expectedRate = 0,
    expectedProfit = 0,
    unit = "unit",
    investmentDetails,
    investmentRate = {
      ratePerDay: 0,
      ratePerMonth: 0,
      ratePerYear: 0,
    },
    lastDate = "",
    stock = 0,
    totalPurchases = 0,
    totalSales = 0,
    stockToBuyback = 0,
  } = investmentData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { investId } = useParams();
  const { investmentById, isLoading, isError } = useSelector(
    (state) => state.investment
  );

  useEffect(() => {
    dispatch(getInvestmentById(investId));
  }, []);

  useEffect(() => {
    setFormBuyback("");
    if (investmentById) {
      setInvestmentData(investmentById);
      if (investmentById.lastBuyback)
        setFormBuyback(investmentById.lastBuyback);
    }
    if (isError || !investmentById) navigate("/Page404");
    return () => dispatch(reset());
  }, [investmentById]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      investId,
      buyBack: formBuyback,
      date: new Date(),
    };

    if (!formBuyback) {
      toast.error("Mohon isi data buy back! 😣");
    } else {
      await dispatch(addBuyback(payload));
      dispatch(getInvestmentById(investId));
      setFormBuyback("");
    }
  };

  if (isLoading) return <SpinnerOverlay />;

  return (
    <>
      <header
        className="sub-header"
        onClick={() => {
          navigate(-1);
        }}
      >
        <RiArrowLeftSLine />
        <h1>{investName}</h1>
      </header>

      <section className="investment-detail">
        <p className="last-date">
          Data terakhir:{" "}
          {lastDate !== ""
            ? new Date(lastDate).toLocaleString("id-ID", {
                dateStyle: "long",
              })
            : "Data belum tersedia"}
        </p>
        <form onSubmit={onSubmit} className="add-buyback">
          <label htmlFor="buyBack">Harga jual (per {unit && unit})</label>
          <div className="input-btn-buyback">
            <input
              type="number"
              pattern="[-+]?[0-9]*[.,]?[0-9]+"
              min={0}
              step={0.0001}
              id="formBuyback"
              name="formBuyback"
              value={formBuyback}
              autoComplete="off"
              placeholder="Rp"
              onChange={(event) => setFormBuyback(event.target.value)}
            />
            <button type="submit">Perbarui</button>
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
                {totalPurchases.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
                {/* Rp 18.296.647,5 */}
              </p>
            </div>
            <div className="total-penjualan">
              <h3>Total penjualan</h3>
              <p>
                {totalSales.toLocaleString("id-ID", {
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
                (parseFloat(investmentRate.ratePerYear * 100).toFixed(2) >=
                expectedRate
                  ? "bg-green"
                  : parseFloat(investmentRate.ratePerYear * 100).toFixed(2) > 0
                  ? "bg-yellow"
                  : "bg-red")
              }
            >
              <h3>Imbal hasil</h3>
              <p>
                {investmentRate.ratePerYear
                  ? parseFloat(investmentRate.ratePerYear * 100).toFixed(2)
                  : 0}{" "}
                %
              </p>
            </div>
            <div
              className={
                "stock-buyback " +
                (stockToBuyback - (totalPurchases - totalSales) >=
                expectedProfit
                  ? "bg-green"
                  : stockToBuyback - (totalPurchases - totalSales) > 0
                  ? "bg-yellow"
                  : "bg-red")
              }
            >
              <h3>
                Harga jual
                <br />
                stok saat ini
              </h3>
              <p>
                {stockToBuyback.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
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
                  Harga jual <span>(per {unit})</span>
                </th>
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
                        dateStyle: "long",
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
                      {el.buyBack.toLocaleString("id-ID", {
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
                        onClick={() => {
                          setIsModalDelete(true);
                        }}
                      />
                      {/* reset confirmation */}
                      <Modal
                        isOpen={isModalDelete}
                        setIsOpen={setIsModalDelete}
                      >
                        <p>Apakah anda ingin menghapus data ini?</p>
                        <div className="delete-confirmation">
                          <button
                            className="yes"
                            onClick={async () => {
                              await dispatch(
                                deleteInvestmentDetail({
                                  investId,
                                  investDetailId: el._id,
                                })
                              );
                              dispatch(getInvestmentById(investId));
                              setIsModalDelete(!isModalDelete);
                            }}
                          >
                            Ya
                          </button>
                          <button
                            className="no"
                            onClick={() => {
                              setIsModalDelete(!isModalDelete);
                            }}
                          >
                            Tidak
                          </button>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {investmentDetails?.length === 0 && (
            <div className="detail-not-found"> Data belum tersedia</div>
          )}
        </div>
        {investmentDetails?.length > 0 && (
          <button
            onClick={() => setIsModalReset(true)}
            className="reset-detail"
          >
            <MdOutlineRefresh />{" "}
            <p style={{ marginLeft: "2px", marginBottom: "2px" }}>reset</p>
          </button>
        )}

        {/* reset confirmation */}
        <Modal isOpen={isModalReset} setIsOpen={setIsModalReset}>
          <p>Apakah anda ingin mereset data rincian investasi anda?</p>
          <div className="delete-confirmation">
            <button
              className="yes"
              onClick={() => {
                dispatch(resetInvestmentDetail(investId));
                setIsModalReset(!isModalReset);
              }}
            >
              Ya
            </button>
            <button
              className="no"
              onClick={() => {
                setIsModalReset(!isModalReset);
              }}
            >
              Tidak
            </button>
          </div>
        </Modal>
      </section>
    </>
  );
}

export default InvestmentDetail;
