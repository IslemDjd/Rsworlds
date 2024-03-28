import "./footer.scss";
import { FaFacebook, FaInstagram, FaTiktok, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState({});
  const linksCollectionRef = collection(db, "Links");

  const getLinks = async () => {
    try {
      const data = await getDocs(linksCollectionRef);
      const linksData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setLinks(linksData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <footer>
      <div className="brand">
        <img
          className="logo"
          onClick={() => {
            navigate("/articles");
          }}
          src={logo}
          alt="Logo"
        />
        <h1>RsWorlds</h1>
      </div>
      <div className="socialMedia">
        <h3 style={{ color: "var(--primary)" }}>Our Accounts</h3>
        <div className="socialIcons">
          <a href={links[0]?.facebook}>
            <FaFacebook className="facebook social" />
          </a>
          <a href={links[0]?.instagram}>
            <FaInstagram className="instagram social" />
          </a>
          <a href={links[0]?.tiktok}>
            <FaTiktok className="tiktok social" />
          </a>
        </div>
      </div>
      <div className="contact">
        <h3>Contact Us </h3>
        <FaPhone />
        <h4>{links[0]?.phoneNumber}</h4>
      </div>
    </footer>
  );
};

export default Footer;
