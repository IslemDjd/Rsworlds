import logo from "../../assets/logo.png";
import "./Navbar.scss";
import Cart from "../cart/CartBtn";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div
        className="brand"
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="logo" src={logo} alt="Logo" />
        <h1>RsWorlds</h1>
      </div>
      <nav>
        <Cart />
      </nav>
    </header>
  );
};

export default Navbar;
