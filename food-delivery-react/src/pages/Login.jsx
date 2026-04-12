import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { loginByEmail } = useUser();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginByEmail(email);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div className="site-shell">
      <TopNav />

      <main className="page-main">
        <div
          className="payment-form-card"
          style={{ maxWidth: "620px", margin: "0 auto" }}
        >
          <h2>Sign In</h2>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="form-error">{error}</p>}
            </div>

            <button type="submit" className="place-order-button">
              Sign In
            </button>
          </form>

          <button
            type="button"
            className="secondary-link-button"
            style={{ width: "100%", marginTop: "1rem" }}
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;