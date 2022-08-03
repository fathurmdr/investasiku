const findRate = require("./findRate");

const f1 = (x) =>
  data.reduce(
    (result, el) =>
      result +
      el.price *
        Math.pow(x, (data.slice(-1)[0].date - el.date) / (60 * 60 * 1000)),
    0
  );
const f2 = (x) =>
  data.reduce(
    (result, el) =>
      result +
      el.price *
        Math.pow(x, (data.slice(-1)[0].date - el.date) / (30 * 60 * 60 * 1000)),
    0
  );
const f3 = (x) =>
  data.reduce(
    (result, el) =>
      result +
      el.price *
        Math.pow(
          x,
          (data.slice(-1)[0].date - el.date) / (365 * 60 * 60 * 1000)
        ),
    0
  );

const data = [
  {
    _id: "62e8df9bab28646a866abe20",
    investment: "62dad44a6638819dba3f7cb3",
    date: "2019-10-24T08:22:07.000Z",
    quantity: 10,
    price: 7610000,
    buy_back: 673000,
    createdAt: "2022-08-02T08:26:03.129Z",
    updatedAt: "2022-08-02T08:26:03.129Z",
    __v: 0,
  },
  {
    _id: "62e0f5dcec9e9dea34788309",
    investment: "62dad44a6638819dba3f7cb3",
    date: "2022-07-21T00:00:00.000Z",
    quantity: 0,
    price: 0,
    buy_back: 967000,
    createdAt: "2022-07-27T08:22:52.690Z",
    updatedAt: "2022-07-27T08:22:52.690Z",
    __v: 0,
  },
  {
    _id: "62e0f5ecec9e9dea3478830d",
    investment: "62dad44a6638819dba3f7cb3",
    date: "2022-07-21T00:00:00.000Z",
    quantity: 10,
    price: 9296647.5,
    buy_back: 967000,
    createdAt: "2022-07-27T08:23:08.215Z",
    updatedAt: "2022-07-27T08:23:08.215Z",
    __v: 0,
  },
  {
    _id: "62e8d260198a6511693e9824",
    investment: "62dad44a6638819dba3f7cb3",
    date: "2022-08-02T07:29:35.901Z",
    quantity: 0,
    price: 0,
    buy_back: 847000,
    createdAt: "2022-08-02T07:29:36.262Z",
    updatedAt: "2022-08-02T07:29:36.262Z",
    __v: 0,
  },
  {
    _id: "62e8e68eefe4d294d474cbf3",
    investment: "62dad44a6638819dba3f7cb3",
    date: "2022-08-02T08:54:44.422Z",
    quantity: -1,
    price: -850000,
    buy_back: 870000,
    createdAt: "2022-08-02T08:55:42.800Z",
    updatedAt: "2022-08-02T08:55:42.800Z",
    __v: 0,
  },
  {
    _id: "62e0f5f0ec9e9dea34788311",
    investment: "62dad44a6638819dba3f7cb3",
    date: "2022-10-27T00:00:00.000Z",
    quantity: -15,
    price: -13065000,
    buy_back: 967000,
    createdAt: "2022-07-27T08:23:12.910Z",
    updatedAt: "2022-07-27T08:23:12.910Z",
    __v: 0,
  },
  {
    _id: "62e0f5f0ec9e9dea34788311",
    investment: "62dad44a6638819dba3f7cb3",
    date: "2022-10-27T00:00:00.000Z",
    quantity: -15,
    price: -3868000,
    buy_back: 967000,
    createdAt: "2022-07-27T08:23:12.910Z",
    updatedAt: "2022-07-27T08:23:12.910Z",
    __v: 0,
  },
];

console.log(findRate(data));

// console.log(f1(1 + findRate(data).rate));
console.log(1 + findRate(data).rate);
// console.log(f2(1 + findRate(data).rateMonth));
// console.log(f2(1 + -0.00038162414021636337));
// console.log(f3(1 + findRate(data).rateYear));

// data.forEach((e) => {
//   // console.log((data.slice(-1)[0].date - e.date) / (24 * 60 * 60 * 1000));
//   console.log(new Date(e.date));
// });
