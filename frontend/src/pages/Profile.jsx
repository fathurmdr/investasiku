import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ListMenu from "../components/ListMenu";
import Navigation from "../components/Navigation";
import { logout, reset } from "../features/auth/authSlice";

// const listMenu = [
//   {
//     menu: "Ubah profil",
//     link: "./editProfile",
//   },
//   {
//     menu: "Ganti password",
//     link: "./gantiPassword",
//   },
//   {
//     menu: "Hapus akun",
//     link: "./hapusAkun",
//   },
// ];

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <header className="header">
        <h1>Profile</h1>
      </header>
      <section className="profile-menu">
        {/* <ListMenu menu={listMenu} headerName="Profile" /> */}
        <button type="button" onClick={onLogout} className="btn btn-logout">
          Logout
        </button>
      </section>

      <Navigation />
    </>
  );
}

export default Profile;
