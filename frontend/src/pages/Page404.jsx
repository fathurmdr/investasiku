import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingPageStyle = {
  position: "fixed",
  right: "0",
  left: "0",
  top: "0",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function Page404() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div style={LandingPageStyle}>
        <div>
          <p style={{ color: "#f36060", fontSize: "42px", fontWeight: "bold" }}>
            404 Not Found
          </p>
          <div className="auth-footer">
            <p style={{ fontSize: "18px" }}>
              Go to
              {user ? (
                <Link to="/dashboard"> Dashboard</Link>
              ) : (
                <Link to="/"> Landing Page</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page404;
