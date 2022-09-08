import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddInvestment from "./pages/AddInvestment";
import BuyInvestment from "./pages/BuyInvestment";
import Dashboard from "./pages/Dashboard";
import EditInvestment from "./pages/EditInvestment";
import EditInvestmentDetail from "./pages/EditInvestmentDetail";
import Investment from "./pages/Investment";
import InvestmentDetail from "./pages/InvestmentDetail";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import SellInvestment from "./pages/SellInvestment";
import SignUp from "./pages/SignUp";
import Simulation from "./pages/Simulation";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/dashboard" /> : <SignUp />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/investments"
              element={user ? <Investment /> : <Navigate to="/login" />}
            />
            <Route
              path="/investments/addInvestment"
              element={user ? <AddInvestment /> : <Navigate to="/login" />}
            />
            <Route
              path="/investments/edit/:investId"
              element={user ? <EditInvestment /> : <Navigate to="/login" />}
            />
            <Route
              path="/investments/detail/:investId"
              element={user ? <InvestmentDetail /> : <Navigate to="/login" />}
            />
            <Route
              path="/investments/detail/:investId/buy"
              element={user ? <BuyInvestment /> : <Navigate to="/login" />}
            />
            <Route
              path="/investments/detail/:investId/sell"
              element={user ? <SellInvestment /> : <Navigate to="/login" />}
            />
            <Route
              path="/investments/detail/:investId/edit/:investDetailId"
              element={
                user ? <EditInvestmentDetail /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/simulation"
              element={user ? <Simulation /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/Page404" element={<Page404 />} />
            <Route path="*" element={<Navigate to="/Page404" />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
