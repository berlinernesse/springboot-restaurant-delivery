import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";

function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, updateProfile, logout } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phoneNumber: currentUser.phoneNumber || "",
      address: currentUser.address || "",
    });
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await updateProfile(formData);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage(err.message || "Failed to update profile.");
    }
  };

  if (!currentUser) return null;

  return (
    <div className="site-shell">
      <TopNav />
      <main className="page-main">
        <div className="payment-form-card" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2>Customer Profile</h2>
          <form onSubmit={handleSave}>
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
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input name="address" value={formData.address} onChange={handleChange} />
            </div>

            {message && <p className="directory-message">{message}</p>}

            <button type="submit" className="place-order-button">
              Save Profile
            </button>

            <button
              type="button"
              className="secondary-link-button"
              style={{ marginTop: "1rem", width: "100%" }}
              onClick={logout}
            >
              Log Out
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfilePage;