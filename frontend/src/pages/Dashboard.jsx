import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";

function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <header className="dashboard">
        <h1>Halo</h1>
        <h1>{user.name}</h1>
      </header>
      <section></section>
      <Navigation />
    </>
  );
}

export default Dashboard;
