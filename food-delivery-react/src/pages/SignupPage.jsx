import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(formData);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <div className="site-shell">
      <TopNav />
      <main className="page-main">
        <div className="payment-form-card" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2>Create Account</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="10 digits"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input name="address" value={formData.address} onChange={handleChange} />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="place-order-button">
              Create Account
            </button>
          </form>

          <p style={{ marginTop: "1rem" }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SignupPage;