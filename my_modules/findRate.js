const polinomialRoot = require("newton-raphson-method");

const findRate = (data) => {
  const f = (x) =>
    data.reduce((result, el) => {
      const price = el.price;
      const t = new Date(data.slice(-1)[0].date) - new Date(el.date);
      const n = t / (24 * 60 * 60 * 1000);
      return result + price * Math.pow(x, n);
    }, 0);
  const root = polinomialRoot(f, (x0 = 1));
  if (!root) return "gagal menghitung bunga";
  const ratePerDay = root - 1;
  const ratePerMonth = Math.pow(1 + ratePerDay, 30) - 1;
  const ratePerYear = Math.pow(1 + ratePerDay, 365) - 1;
  return { ratePerDay, ratePerMonth, ratePerYear };
};

module.exports = findRate;
