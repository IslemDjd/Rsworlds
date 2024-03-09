import "./footer.scss";
import { FaFacebook, FaInstagram, FaTiktok, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="brand">
        <img
          className="logo"
          onClick={() => {
            navigate("/");
          }}
          src={logo}
          alt="Logo"
        />
        <h1>RsWorlds</h1>
      </div>
      <div className="socialMedia">
        <h3 style={{ color: "var(--primary)" }}>Our Accounts</h3>
        <div className="socialIcons">
          <a href="https://www.facebook.com/profile.php?id=100094023911051&mibextid=LQQJ4d">
            <FaFacebook className="facebook social" />
          </a>
          <a href="https://www.instagram.com/rsworld23">
            <FaInstagram className="instagram social" />
          </a>
          <a href="https://www.tiktok.com/@rsword23?_t=8dJWMtewyqj&_r=1">
            <FaTiktok className="tiktok social" />
          </a>
        </div>
      </div>
      <div className="contact">
        <h4>Contact Us </h4>
        <FaPhone />
        <h4>0555782854</h4>
      </div>
    </footer>
  );
};

export default Footer;
