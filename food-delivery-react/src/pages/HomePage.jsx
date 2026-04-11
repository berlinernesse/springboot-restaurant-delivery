import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/api/restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const featuredRestaurants = useMemo(() => restaurants.slice(0, 3), [restaurants]);

  const mainFeature = featuredRestaurants[0];
  const sideFeature = featuredRestaurants[1];
  const smallFeature = featuredRestaurants[2];

  return (
    <div className="site-shell">
      <TopNav />

      <main className="page-main">
        <section className="hero-simple">
          <span className="hero-badge">Spring Edition 2024</span>
          <h1>
            Savor the <span>Curated</span> Narrative.
          </h1>
          <p>
            An editorial dining experience shaped around discovery, craft, and memorable meals.
          </p>

          <div className="hero-search-bar">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Discover Seoul Bites, Maple Grill, or Italian..."
            />
            <button type="button">Explore</button>
          </div>
        </section>

        <section className="home-featured">
          <div className="section-title-row">
            <div>
              <h2>The Seasonal Spotlight</h2>
              <p>Our editors&apos; highest recommendations this month.</p>
            </div>
            <Link to="/discover">View all restaurants</Link>
          </div>

          {loading && <p className="directory-message">Loading featured restaurants...</p>}
          {error && <p className="directory-message error-text">{error}</p>}

          {!loading && !error && featuredRestaurants.length > 0 && (
            <div className="featured-grid">
              {mainFeature && (
                <Link
                  to={`/restaurants/${mainFeature.id}`}
                  className="featured-card-link featured-main-link"
                >
                  <article className="featured-main-card">
                    <div className="featured-overlay">
                      <span className="featured-tag">Featured</span>
                      <h3>{mainFeature.name}</h3>
                      <p>
                        Discover {mainFeature.cuisineType.toLowerCase()} flavors from {mainFeature.city}.
                      </p>
                    </div>
                  </article>
                </Link>
              )}

              <div className="featured-right-column">
                {sideFeature && (
                  <Link
                    to={`/restaurants/${sideFeature.id}`}
                    className="featured-card-link"
                  >
                    <article className="featured-side-card">
                      <div className="featured-side-image featured-side-image-1" />
                      <div className="featured-side-body">
                        <div className="featured-side-top">
                          <h3>{sideFeature.name}</h3>
                          <span>{sideFeature.rating}</span>
                        </div>
                        <p>
                          {sideFeature.cuisineType} • {sideFeature.city}
                        </p>
                      </div>
                    </article>
                  </Link>
                )}

                {smallFeature && (
                  <Link
                    to={`/restaurants/${smallFeature.id}`}
                    className="featured-card-link"
                  >
                    <article className="featured-small-card">
                      <div className="featured-small-image featured-side-image-2" />
                      <h3>{smallFeature.name}</h3>
                      <p>
                        {smallFeature.cuisineType} • {smallFeature.city}
                      </p>
                    </article>
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;