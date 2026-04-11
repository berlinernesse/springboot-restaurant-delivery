import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

function DiscoverPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/restaurants")
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

  return (
    <div className="site-shell">
      <TopNav />

      <main className="page-main">
        <section className="discover-simple">
          <span className="discover-label">Discovery</span>
          <h1>Uncover the city&apos;s most evocative dining rooms.</h1>
          <p>
            Browse restaurants, explore cuisines, and connect the interface to your real backend data cleanly.
          </p>
        </section>

        <section className="discover-directory">
          <div className="section-title-row">
            <div>
              <h2>The Directory</h2>
              <p>Browse available restaurants from the gateway service.</p>
            </div>
          </div>

          {loading && <p className="directory-message">Loading restaurants...</p>}
          {error && <p className="directory-message error-text">{error}</p>}

          {!loading && !error && (
            <div className="restaurant-grid">
              {restaurants.map((restaurant) => (
                <Link
                  to={`/restaurants/${restaurant.id}`}
                  className="restaurant-card-link"
                  key={restaurant.id}
                >
                  <article className="restaurant-card">
                    <div className="restaurant-card-image" />
                    <div className="restaurant-card-body">
                      <div className="restaurant-card-top">
                        <h3>{restaurant.name}</h3>
                        <span className="restaurant-rating">★ {restaurant.rating}</span>
                      </div>

                      <p className="restaurant-meta">
                        {restaurant.cuisineType} • {restaurant.city}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DiscoverPage;