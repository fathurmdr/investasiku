import { useSelector } from "react-redux";
import Navbar from "../components/organisms/Navbar";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <header className="dashboard">
        <h1>Halo</h1>
        <h1>{user.name}</h1>
      </header>
      <section></section>
      <Navbar currentPage="dashboard" />
    </>
  );
}

export default Dashboard;
