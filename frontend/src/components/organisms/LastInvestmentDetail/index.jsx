function index(props) {
  const {
    lastDate,
    onSubmit,
    unit,
    buyBack,
    stock,
    totalPembelian,
    totalPenjualan,
    sukuBunga,
    investmentById,
  } = props;
  return (
    <>
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
    </>
  );
}

export default index;
