import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function OrderConfirmationPage() {
  const { lastOrder } = useCart();

  const orderItems = lastOrder?.items || [];

  return (
    <div className="site-shell">
      <TopNav />

      <main className="confirmation-page">
        <section className="confirmation-hero">
          <div className="confirmation-copy">
            <span className="confirmation-chip">Order Confirmed</span>

            <h1>
              Your Table is <span>Being Prepared</span>
            </h1>

            <p>
              Our master chefs have received your selection. We are curating your
              experience with the finest ingredients and meticulous attention to
              detail.
            </p>

            <div className="confirmation-arrival">
              <div className="arrival-time">30 – 45 mins</div>
              <div className="arrival-meta">
                <span>Estimated Arrival</span>
                <strong>Doorstep Delivery</strong>
              </div>
            </div>
          </div>

          <div className="confirmation-image-panel" />
        </section>

        <section className="confirmation-layout">
          <div className="confirmation-summary-card">
            <div className="confirmation-summary-header">
              <h2>Order Summary</h2>
              <span>{lastOrder ? `Order #${lastOrder.id}` : "No recent order"}</span>
            </div>

            {orderItems.length === 0 ? (
              <p className="directory-message">No confirmed order found yet.</p>
            ) : (
              <>
                {orderItems.map((item, index) => (
                  <div className="confirmation-item" key={item.id}>
                    <div
                      className={`confirmation-item-image ${
                        index % 2 === 0 ? "confirm-image-1" : "confirm-image-2"
                      }`}
                    />
                    <div className="confirmation-item-info">
                      <h3>{item.name}</h3>
                      <p>
                        {item.quantity}x{" "}
                        {item.subtitle || item.category || "Curated Selection"}
                      </p>
                    </div>
                    <div className="confirmation-item-price">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="confirmation-totals-box">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>${lastOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Curatorial Fee</span>
                    <span>${lastOrder.fees.toFixed(2)}</span>
                  </div>
                  <div className="payment-summary-divider" />
                  <div className="summary-total confirm-total">
                    <span>Total</span>
                    <strong>${lastOrder.total.toFixed(2)}</strong>
                  </div>
                </div>
              </>
            )}
          </div>

          <aside className="confirmation-side">
            <div className="confirmation-side-card destination-card">
              <h3>Delivery Destination</h3>
              <p>
                Penthouse 4B, The Gilded Towers
                <br />
                New York City, NY 10012
              </p>

              <h3>Curation Note</h3>
              <p className="italic-note">
                “Extra parmesan on the side, please. It&apos;s a celebratory evening.”
              </p>

              <button
                type="button"
                className="primary-gradient-button full-width-button"
              >
                Track My Curation
              </button>
            </div>

            <div className="confirmation-side-card assistance-card">
              <h3>Need Assistance?</h3>
              <p>Our Concierge is available 24/7 for order adjustments.</p>
              <a href="#">Contact Concierge</a>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default OrderConfirmationPage;