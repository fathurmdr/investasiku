import { RiArrowRightSLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/atoms/Header";
import Navbar from "../components/organisms/Navbar";
import { logout, reset } from "../features/auth/authSlice";

const listMenu = [
  {
    menu: "Ubah profil",
    link: "./",
  },
  {
    menu: "Ganti password",
    link: "./",
  },
  {
    menu: "Hapus akun",
    link: "./",
  },
];

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <>
      <Header title="Profile" />

      <section className="profile-menu">
        <div className="list-menu">
          <li>
            <div className="detail">
              <p>Ubah Profil</p>
              <RiArrowRightSLine />
            </div>
          </li>
          <li>
            <div className="detail">
              <p>Hapus Akun</p>
              <RiArrowRightSLine />
            </div>
          </li>
          <li>
            <div className="detail">
              <p>Tentang Aplikasi</p>
              <RiArrowRightSLine />
            </div>
          </li>
        </div>
        <button type="button" onClick={onLogout} className="btn btn-logout">
          Logout
        </button>
      </section>

      <Navbar currentPage="profile" />
    </>
  );
}

export default Profile;
