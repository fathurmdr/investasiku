import React from "react";
import { Link } from "react-router-dom";

function AuthFooter(props) {
  const { currentPage = "login" } = props;
  return (
    <div className="auth-footer">
      {currentPage === "login" ? (
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      ) : (
        <p>
          Go back to <Link to="/login">Log in</Link>
        </p>
      )}
    </div>
  );
}

export default AuthFooter;
