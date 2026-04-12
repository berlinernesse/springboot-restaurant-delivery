import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, fees, total, placeOrder } = useCart();
  const { currentUser } = useUser();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (selectedPaymentMethod === "card") {
      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = "Cardholder name is required.";
      }

      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required.";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits.";
      }

      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required.";
      } else if (!/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Use MM/YY format.";
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required.";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits.";
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = "Billing address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.province.trim()) {
      newErrors.province = "Province is required.";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const isValid = validateForm();
    if (!isValid) return;

    try {
      await placeOrder({
        paymentMethod: selectedPaymentMethod,
        customerId: currentUser.id,
      });
      navigate("/confirmation");
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong while placing your order.");
    }
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

            {!currentUser && (
              <div className="payment-form-card">
                <h3>Please Sign In</h3>
                <p className="directory-message" style={{ marginTop: 0 }}>
                  You need an account before placing an order.
                </p>
                <button
                  type="button"
                  className="place-order-button"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
              </div>
            )}

            <section className="payment-section">
              <div className="payment-section-header">
                <h2>Payment Method</h2>
              </div>

              <div className="payment-method-grid">
                <button
                  type="button"
                  className={`payment-method-option ${
                    selectedPaymentMethod === "card" ? "active-payment-method" : ""
                  }`}
                  onClick={() => setSelectedPaymentMethod("card")}
                >
                  💳 Card
                </button>

                <button
                  type="button"
                  className={`payment-method-option ${
                    selectedPaymentMethod === "applepay" ? "active-payment-method" : ""
                  }`}
                  onClick={() => setSelectedPaymentMethod("applepay")}
                >
                  🍎 Apple Pay
                </button>

                <button
                  type="button"
                  className={`payment-method-option ${
                    selectedPaymentMethod === "googlepay" ? "active-payment-method" : ""
                  }`}
                  onClick={() => setSelectedPaymentMethod("googlepay")}
                >
                  🟢 Google Pay
                </button>

                <button
                  type="button"
                  className={`payment-method-option ${
                    selectedPaymentMethod === "paypal" ? "active-payment-method" : ""
                  }`}
                  onClick={() => setSelectedPaymentMethod("paypal")}
                >
                  🅿️ PayPal
                </button>
              </div>
            </section>

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

            {selectedPaymentMethod === "card" && (
              <section className="payment-form-card">
                <h3>Card Details</h3>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholderName"
                    placeholder="Name as it appears on card"
                    value={formData.cardholderName}
                    onChange={handleChange}
                  />
                  {errors.cardholderName && (
                    <p className="form-error">{errors.cardholderName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  {errors.cardNumber && (
                    <p className="form-error">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="payment-form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM / YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                    {errors.expiryDate && (
                      <p className="form-error">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="•••"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                    {errors.cvv && <p className="form-error">{errors.cvv}</p>}
                  </div>
                </div>
              </section>
            )}

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
                  name="address"
                  placeholder="128 Editorial Way, Culinary District"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="form-error">{errors.address}</p>}
              </div>

              <div className="payment-form-row three-column-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <p className="form-error">{errors.city}</p>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="province"
                    placeholder="NY"
                    value={formData.province}
                    onChange={handleChange}
                  />
                  {errors.province && (
                    <p className="form-error">{errors.province}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="10012"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                  {errors.postalCode && (
                    <p className="form-error">{errors.postalCode}</p>
                  )}
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
                            {item.quantity}x{" "}
                            {item.subtitle || item.category || "Curated Selection"}
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