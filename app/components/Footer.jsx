import { FaBookOpen } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container">
      <footer>
        <div className="footerLeft">
          <FaBookOpen className="footerIcon" />
        </div>
        <div className="footerRight">
          <p>© 2025 本棚</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
