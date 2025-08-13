import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import "./Menubar.css";

const Menubar = () => {
  const { setAuthData, auth } = useContext(AppContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setAuthData(null, null);

    navigate("/login");
  };

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isAdmin = auth.role === "ROLE_ADMIN";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <a className="navbar-brand" href="/">
        <img src={assets.logo} alt="Logo" height="40" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/dashboard") ? "fa-bold text-warning" : ""
              }`}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/explore") ? "fa-bold text-warning" : ""
              }`}
              to="/explore"
            >
              Explore
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/items") ? "fa-bold text-warning" : ""
                  }`}
                  to="/items"
                >
                  Manage Items
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/category") ? "fa-bold text-warning" : ""
                  }`}
                  to="/category"
                >
                  Manage Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/users") ? "fa-bold text-warning" : ""
                  }`}
                  to="/users"
                >
                  Manage Users
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/orders") ? "fa-bold text-warning" : ""
              }`}
              to="/orders"
            >
              Orders History
            </Link>
          </li>
        </ul>
        {/* Add the dropdown for userprofile */}

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbar-dropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={assets.profile} alt="" height={32} width={32} />
            </a>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbar-dropdown"
            >
              <li>
                <a href="#" className="dropdown-item">
                  Settings
                </a>
                <a href="#" className="dropdown-item">
                  Activity Log
                </a>

                <hr className="dropdown-divider" />

                <a href="#" className="dropdown-item" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menubar;
