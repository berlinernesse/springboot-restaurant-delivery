import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import JournalsPage from "./pages/JournalsPage";
import RestaurantConflictModal from "./components/RestaurantConflictModal";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<OrderConfirmationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/journals" element={<JournalsPage />} />
        
      </Routes>

      <RestaurantConflictModal />
    </BrowserRouter>
  );
}

export default App;