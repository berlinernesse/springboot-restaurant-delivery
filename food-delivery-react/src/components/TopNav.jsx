import { Link, NavLink } from "react-router-dom";

function TopNav() {
  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <Link to="/" className="brand">
          The Culinary Curator
        </Link>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
            The Edit
          </NavLink>
          <a href="#" className="nav-link">Journals</a>
          <NavLink to="/discover" className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}>
            Restaurants
          </NavLink>
          <a href="#" className="nav-link">Curation</a>
          <a href="#" className="nav-link">Private Chef</a>
        </div>

        <div className="nav-actions">
          <input
            type="text"
            className="nav-search"
            placeholder="Search curated tastes..."
          />
          <button className="icon-button" type="button">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button className="sign-in-button" type="button">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;