import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function TopNav() {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <Link to="/" className="brand">
          The Culinary Curator
        </Link>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
          >
            The Edit
          </NavLink>

          <NavLink
            to="/discover"
            className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
          >
            Restaurants
          </NavLink>

          {currentUser && (
            <>
              <NavLink
                to="/journals"
                className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
              >
                Journals
              </NavLink>
              
              
            </>
          )}
        </div>

        <div className="nav-actions">
          <input
            type="text"
            className="nav-search"
            placeholder="Search curated tastes..."
          />

          <button
            className="icon-button"
            type="button"
            onClick={() => navigate("/cart")}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>

          {!currentUser ? (
            <>
              <button
                className="secondary-link-button nav-auth-button"
                type="button"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </button>

              <button
                className="sign-in-button"
                type="button"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <button
                className="secondary-link-button nav-auth-button"
                type="button"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>

              <button
                className="sign-in-button"
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopNav;