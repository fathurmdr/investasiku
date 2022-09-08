import AddInvestmentButton from "../components/atoms/AddInvestmentButton";
import Header from "../components/atoms/Header";
import ListInvestment from "../components/organisms/ListInvestment";
import Navbar from "../components/organisms/Navbar";

function Investment() {
  return (
    <>
      <Header title="Invesments" />
      <ListInvestment />
      <AddInvestmentButton />
      <Navbar currentPage="investments" />
    </>
  );
}

export default Investment;
