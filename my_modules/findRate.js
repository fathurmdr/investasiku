const polinomialRoot = require("newton-raphson-method");

const findRate = (data) => {
  const f = (x) =>
    data.reduce(
      (result, el) =>
        result +
        el.price *
          Math.pow(
            x,
            (new Date(data.slice(-1)[0].date) - new Date(el.date)) /
              (24 * 60 * 60 * 1000)
          ),
      0
    );
  const root = polinomialRoot(f, (x0 = 1));
  const rate = root - 1;
  const rateMonth = Math.pow(1 + rate, 30) - 1;
  const rateYear = Math.pow(1 + rate, 365) - 1;
  return { rate, rateMonth, rateYear };
};

module.exports = findRate;
