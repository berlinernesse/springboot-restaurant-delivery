import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";

function JournalsPage() {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/orders");

        if (!response.ok) {
          throw new Error("Failed to load order history.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, navigate]);

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders
      .filter((order) => order.customerId === currentUser.id)
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  }, [orders, currentUser]);

  if (!currentUser) return null;

  return (
    <div className="site-shell">
      <TopNav />

      <main className="page-main">
        <section className="confirmation-layout">
          <div className="confirmation-summary-card">
            <div className="confirmation-summary-header">
              <h2>Your Order Journal</h2>
              <span>{userOrders.length} order{userOrders.length !== 1 ? "s" : ""}</span>
            </div>

            {loading ? (
              <p className="directory-message">Loading your order history...</p>
            ) : error ? (
              <p className="form-error">{error}</p>
            ) : userOrders.length === 0 ? (
              <p className="directory-message">
                No past orders yet. Once you place an order, it will appear here.
              </p>
            ) : (
              <div className="journal-orders-list">
                {userOrders.map((order) => (
                  <article className="journal-order-card" key={order.id}>
                    <div className="journal-order-top">
                      <div>
                        <h3>Order #{order.id}</h3>
                        <p className="journal-order-date">
                          {new Date(order.orderDate).toLocaleString()}
                        </p>
                      </div>

                      <span className={`journal-status-chip status-${order.orderStatus?.toLowerCase()}`}>
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="journal-order-details">
                      <div className="summary-line">
                        <span>Restaurant ID</span>
                        <span>{order.restaurantId}</span>
                      </div>
                      <div className="summary-line">
                        <span>Payment Method</span>
                        <span>{order.paymentMethod}</span>
                      </div>
                      <div className="summary-line">
                        <span>Payment Status</span>
                        <span>{order.paymentStatus}</span>
                      </div>
                      <div className="summary-line">
                        <span>Items</span>
                        <span>{order.foodItemIds?.length || 0}</span>
                      </div>
                    </div>

                    <div className="payment-summary-divider" />

                    <div className="summary-total confirm-total">
                      <span>Total</span>
                      <strong>${Number(order.totalAmount).toFixed(2)}</strong>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="confirmation-side">
            <div className="confirmation-side-card destination-card">
              <h3>Welcome Back</h3>
              <p>{currentUser.name}</p>
              <p>{currentUser.email}</p>
              <p>{currentUser.address}</p>

              <button
                type="button"
                className="primary-gradient-button full-width-button"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </button>
            </div>

            <div className="confirmation-side-card assistance-card">
              <h3>Need Assistance?</h3>
              <p>Need help with a past order or account details?</p>
              <a href="#">Contact Concierge</a>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default JournalsPage;