import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function RestaurantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, total } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRestaurantDetails() {
      try {
        setLoading(true);
        setError("");

        const [restaurantResponse, foodItemsResponse] = await Promise.all([
          fetch(`http://localhost:8082/api/restaurants/${id}`),
          fetch(`http://localhost:8082/api/fooditems/restaurant/${id}`),
        ]);

        if (!restaurantResponse.ok) {
          throw new Error("Failed to fetch restaurant details");
        }

        if (!foodItemsResponse.ok) {
          throw new Error("Failed to fetch restaurant menu");
        }

        const restaurantData = await restaurantResponse.json();
        const foodItemsData = await foodItemsResponse.json();

        setRestaurant(restaurantData);
        setFoodItems(foodItemsData);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadRestaurantDetails();
  }, [id]);

  const groupedItems = useMemo(() => {
    const groups = {};

    foodItems.forEach((item) => {
      const category = item.category || "Menu";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
    });

    return groups;
  }, [foodItems]);

  const totalCartQuantity = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  if (loading) {
    return (
      <div className="site-shell">
        <TopNav />
        <main className="restaurant-page">
          <div className="page-main">
            <p className="directory-message">Loading restaurant...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="site-shell">
        <TopNav />
        <main className="restaurant-page">
          <div className="page-main">
            <p className="directory-message error-text">
              {error || "Restaurant not found."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryNames = Object.keys(groupedItems);

  return (
    <div className="site-shell">
      <TopNav />

      <main className="restaurant-page">
        <section className="restaurant-hero">
          <div className="restaurant-hero-overlay" />
          <div className="restaurant-hero-content">
            <div className="restaurant-badges">
              <span className="hero-chip">Curated Pick</span>
              <span className="hero-rating">★ {restaurant.rating}</span>
            </div>

            <h1>{restaurant.name}</h1>

            <div className="restaurant-meta">
              <span>📍 {restaurant.city}</span>
              <span>🍽 {restaurant.cuisineType}</span>
              <span>⏱ 30–45 mins delivery</span>
            </div>
          </div>
        </section>

        <section className="restaurant-content">
          <aside className="restaurant-sidebar">
            <div className="sidebar-sticky">
              <h3>Categories</h3>

              <nav className="category-nav">
                {categoryNames.map((category, index) => (
                  <a
                    key={category}
                    href={`#category-${index}`}
                    className={index === 0 ? "active-category" : ""}
                  >
                    <span>{category}</span>
                    <span>›</span>
                  </a>
                ))}
              </nav>

              <div className="curator-note">
                <p className="note-title">Curator&apos;s Note</p>
                <p>
                  “{restaurant.name} brings together{" "}
                  {restaurant.cuisineType.toLowerCase()} flavors in a refined,
                  curated dining experience.”
                </p>
              </div>
            </div>
          </aside>

          <div className="restaurant-menu">
            {categoryNames.length === 0 && (
              <p className="directory-message">No menu items available yet.</p>
            )}

            {categoryNames.map((category, categoryIndex) => (
              <section
                key={category}
                id={`category-${categoryIndex}`}
                className="menu-section"
              >
                <div className="menu-section-header">
                  <div>
                    <h2>{category}</h2>
                    <p>Selections currently available from this kitchen.</p>
                  </div>
                </div>

                <div className="menu-card-grid">
                  {groupedItems[category].map((item, itemIndex) => (
                    <article className="menu-card" key={item.id}>
                      <div
                        className={`menu-card-image ${
                          itemIndex % 2 === 0 ? "menu-image-1" : "menu-image-2"
                        }`}
                      />
                      <div className="menu-card-body">
                        <div className="menu-card-top">
                          <div>
                            <h4>{item.name}</h4>
                            <small>{item.availabilityStatus}</small>
                          </div>
                          <span>${Number(item.price).toFixed(2)}</span>
                        </div>

                        <p>
                          A curated {item.category.toLowerCase()} selection from{" "}
                          {restaurant.name}.
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: Number(item.price),
                              category: item.category,
                              subtitle: `${restaurant.name} • ${item.availabilityStatus}`,
                              restaurantId: restaurant.id,
                              restaurantName: restaurant.name,
                            })
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <div className="floating-cart">
          <button
            type="button"
            className="floating-cart-button"
            onClick={() => navigate("/cart")}
          >
            <div className="floating-cart-text">
              <span>Your Order</span>
              <strong>
                {totalCartQuantity > 0
                  ? `${totalCartQuantity} item${totalCartQuantity > 1 ? "s" : ""} — $${total.toFixed(2)}`
                  : "Cart is empty"}
              </strong>
            </div>
            <div className="floating-cart-divider" />
            <span className="floating-cart-icon">🛒</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RestaurantDetailsPage;