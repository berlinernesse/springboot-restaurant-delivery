import { Link, useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    subtotal,
    fees,
    total,
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <div className="site-shell">
      <TopNav />

      <main className="curation-page">
        <header className="curation-header">
          <h1>Your Curation</h1>
          <p>
            Review your order before continuing to secure checkout.
          </p>
        </header>

        <div className="curation-layout">
          <section className="curation-items-column">
            {cartItems.length === 0 ? (
              <div className="cart-summary-card">
                <div className="empty-cart-state">
                  <p className="directory-message">Your cart is empty.</p>
                  <Link to="/discover" className="secondary-link-button">
                    Explore Restaurants
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <article className="curation-item-card" key={item.id}>
                    <div
                      className={`curation-item-image ${
                        index % 2 === 0 ? "cart-image-1" : "cart-image-2"
                      }`}
                    />
                    <div className="curation-item-body">
                      <div className="curation-item-top">
                        <div>
                          <span className="curation-item-tag">
                            {item.category || "Curated Selection"}
                          </span>
                          <h3>{item.name}</h3>
                          <p>{item.subtitle || "Curated Selection"}</p>
                        </div>
                        <span className="curation-item-price">
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="curation-item-actions">
                        <div className="curation-qty-control">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span>{String(item.quantity).padStart(2, "0")}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="remove-item-button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}

                <div className="recommendation-teaser">
                  <div>
                    <h4>Enhance your experience?</h4>
                    <p>
                      Members are currently pairing this with a featured house beverage.
                    </p>
                  </div>
                  <button type="button">Add to Curation</button>
                </div>
              </>
            )}
          </section>

          <aside className="curation-sidebar">
            <div className="curation-summary-box">
              <h2>Order Summary</h2>

              <div className="curation-summary-lines">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Curation Fee</span>
                  <span>${fees.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Logistics & Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="payment-summary-divider" />
                <div className="summary-total compact-total">
                  <span>Total</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="curation-checkout-actions">
                <button
                  type="button"
                  className="place-order-button"
                  onClick={() => navigate("/payment")}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Payment
                </button>
                <p className="secure-checkout-note">
                  Secure Encrypted Checkout
                </p>
              </div>

              <div className="delivery-estimate-box">
                <div className="delivery-icon">⏱</div>
                <div>
                  <p>Estimated Arrival</p>
                  <strong>35 – 45 minutes</strong>
                </div>
              </div>
            </div>

            <div className="cart-help-link">
              <span>❔</span>
              <span>Need help with your curation?</span>
            </div>

{/*             <div className="cart-side-card pink-card"> */}
{/*               <h3>Curation Note</h3> */}
{/*               <p className="italic-note"> */}
{/*                 Optional special instructions for your order. This can stay frontend-only for now. */}
{/*               </p> */}
{/*             </div> */}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CartPage;