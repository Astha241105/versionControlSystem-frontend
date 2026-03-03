import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/github-mark-white.svg";

const Navbar = () => {
  return (
    <nav className="app-nav">
      <Link to="/">
        <div className="app-nav__brand">
          <img src={logo} alt="GitHub Logo" />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div className="app-nav__links">
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;