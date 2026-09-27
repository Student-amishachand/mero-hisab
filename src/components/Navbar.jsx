import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ darkMode, onToggleTheme }) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">₹</span>
          <span>
            <strong>Mero Hisab</strong>
            <small>Your Money. Your Hisab.</small>
          </span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/transactions" className="nav-link">
            Transactions
          </NavLink>
          <NavLink to="/analytics" className="nav-link">
            Analytics
          </NavLink>
          <NavLink to="/summary" className="nav-link">
            Monthly Summary
          </NavLink>
        </nav>

        <button
          className="theme-button transition-transform hover:scale-105"
          onClick={onToggleTheme}
          title="Toggle light/dark mode"
          aria-label="Toggle light/dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
