import { Link } from "react-router-dom";
import { logo } from "../images";
import CartModal from "./CartModal";
import "../styles/header.scss";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <div className="logo-container">
          <div>
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="header-text">FIFI-STORE</div>
        </div>
      </Link>
      <div className="cart-container">
        <CartModal />
      </div>
    </header>
  );
};

export default Header;
