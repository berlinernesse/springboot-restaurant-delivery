import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, fees, total, placeOrder } = useCart();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    placeOrder();
    navigate("/confirmation");
  };

  return (
    <div className="site-shell">
      <TopNav />

      <main className="payment-page">
        <section className="checkout-stepper">
          <div className="step-item muted-step">
            <span className="step-circle">1</span>
            <span>Bag</span>
          </div>
          <div className="step-line" />
          <div className="step-item active-step">
            <span className="step-circle">2</span>
            <span>Payment</span>
          </div>
          <div className="step-line" />
          <div className="step-item muted-step">
            <span className="step-circle">3</span>
            <span>Success</span>
          </div>
        </section>

        <section className="payment-layout">
          <div className="payment-main">
            <div className="payment-header">
              <h1>Secure Payment</h1>
              <p>Your transaction is encrypted and secured by CuratedPay.</p>
            </div>

            <section className="payment-section">
              <div className="payment-section-header">
                <h2>Saved Methods</h2>
                <button type="button" className="text-action">
                  Add New
                </button>
              </div>

              <div className="saved-cards-grid">
                <article className="saved-card selected-card">
                  <div className="saved-card-top">
                    <div className="mock-card-chip" />
                    <span className="selected-check">✓</span>
                  </div>
                  <div className="saved-card-number">•••• •••• •••• 4242</div>
                  <div className="saved-card-expiry">EXPIRES 09/26</div>
                  <div className="saved-card-name">ALEXANDER CURATOR</div>
                </article>

                <article className="saved-card muted-card">
                  <div className="saved-card-top">
                    <div className="mock-card-chip muted-chip" />
                  </div>
                  <div className="saved-card-number">•••• •••• •••• 8819</div>
                  <div className="saved-card-expiry">EXPIRES 12/24</div>
                  <div className="saved-card-name">ALEXANDER CURATOR</div>
                </article>
              </div>
            </section>

            <section className="payment-form-card">
              <h3>Card Details</h3>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="Name as it appears on card" />
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" />
              </div>

              <div className="payment-form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM / YY" />
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="•••" />
                </div>
              </div>
            </section>

            <section className="payment-form-card">
              <div className="billing-header">
                <h3>Billing Address</h3>
                <label className="billing-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Same as shipping</span>
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="128 Editorial Way, Culinary District"
                />
              </div>

              <div className="payment-form-row three-column-row">
                <div className="form-group">
                  <input type="text" placeholder="New York" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="NY" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="10012" />
                </div>
              </div>
            </section>
          </div>

          <aside className="payment-side">
            <div className="payment-summary-card">
              <h2>Order Summary</h2>

              {cartItems.length === 0 ? (
                <p className="directory-message">Your cart is empty.</p>
              ) : (
                <>
                  <div className="payment-summary-items">
                    {cartItems.map((item, index) => (
                      <div className="payment-summary-item" key={item.id}>
                        <div
                          className={`summary-item-image ${
                            index % 2 === 0 ? "summary-image-1" : "summary-image-2"
                          }`}
                        />
                        <div className="summary-item-text">
                          <h4>{item.name}</h4>
                          <p>
                            {item.quantity}x {item.subtitle || item.category || "Curated Selection"}
                          </p>
                        </div>
                        <div className="summary-item-price">
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="payment-summary-divider" />

                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Tax & Fees</span>
                    <span>${fees.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Delivery</span>
                    <span>Complimentary</span>
                  </div>

                  <div className="summary-total">
                    <span>Total Amount</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                </>
              )}

              <button
                type="button"
                className="place-order-button"
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
              >
                Place Order
              </button>

              <div className="payment-icons-row">
                <span>🛡️</span>
                <span>💳</span>
                <span>🏛️</span>
              </div>
            </div>

            <div className="guarantee-card">
              <h3>The Curator Guarantee</h3>
              <p>
                Your purchase is protected by our global concierge service.
                If you aren&apos;t delighted, we&apos;ll make it right.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PaymentPage;