import { useNavigate } from "@remix-run/react";
import { FaBookOpen } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const Navigate = useNavigate();
  return (
    <div className="container">
      <footer>
        <div className="footerLeft">
          <FaBookOpen
            className="footerIcon"
            onClick={() => Navigate("/home")}
          />
        </div>
        <div className="footerRight">
          <p>© 2025 本棚</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
