import { Link } from "react-router-dom";
import BannerLogo from "../components/molecules/BannerLogo";

const LandingPageStyle = {
  position: "fixed",
  right: "0",
  left: "0",
  top: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function LandingPage() {
  return (
    <>
      <div style={LandingPageStyle}>
        <div>
          <BannerLogo />
          <p style={{ marginBottom: "4px" }}>Mulai rencanakan investasimu!</p>
          <div className="auth-footer">
            <p>
              <Link to="login">Login</Link>
              {" or "}
              <Link to="signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
