import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../../features/auth/authSlice";
import Spinner from "../../atoms/Spinner";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message + " 😥");
    }

    return () => dispatch(reset());
  }, [isError, isSuccess]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!password || !email) {
      return toast.error("Silahkan isi semua data 😥");
    } else {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Masukan email anda"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Masukan password anda"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          {/* <button type="submit" className="btn btn-block"></button> */}
          <button type="submit" className="btn btn-block">
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
