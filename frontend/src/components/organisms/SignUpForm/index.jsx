import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, signup } from "../../../features/auth/authSlice";
import Spinner from "../../atoms/Spinner";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message + " 😥");
    }

    if (isSuccess) {
      toast.success("Berhasil Sign Up 😎");
      dispatch(reset());
      navigate("/login");
    }
  }, [isError, isSuccess]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== password2) {
      toast.error("Password tidak sama 😥");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(signup(userData));
    }
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama lengkap</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            autoComplete="off"
            placeholder="Masukan nama lengkap anda"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            autoComplete="off"
            placeholder="Masukan email anda"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            autoComplete="off"
            placeholder="Masukan password anda"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Konfirmasi password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            autoComplete="off"
            placeholder="Konfirmasi password anda"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default SignUpForm;
