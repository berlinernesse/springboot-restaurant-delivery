import { useEffect } from "react";
import { useCart } from "../context/CartContext";

function RestaurantConflictModal() {
  const {
    cartItems,
    pendingCartItem,
    showRestaurantConflictModal,
    confirmReplaceCart,
    cancelReplaceCart,
  } = useCart();

  useEffect(() => {
    if (showRestaurantConflictModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showRestaurantConflictModal]);

  if (!showRestaurantConflictModal) {
    return null;
  }

  const currentRestaurantName =
    cartItems.length > 0 ? cartItems[0].restaurantName : "another restaurant";

  return (
    <div className="restaurant-conflict-overlay">
      <div className="restaurant-conflict-modal">
        <div className="restaurant-conflict-icon-wrap">
          <div className="restaurant-conflict-icon">🍴</div>
        </div>

        <div className="restaurant-conflict-content">
          <h2>A Different Kitchen?</h2>

          <p>
            Your current curation contains items from{" "}
            <strong>{currentRestaurantName}</strong>. To add this{" "}
            <strong>&quot;{pendingCartItem?.name}&quot;</strong> from{" "}
            <strong>{pendingCartItem?.restaurantName}</strong>, we&apos;ll need
            to start a fresh selection. Shall we proceed?
          </p>

          <div className="restaurant-conflict-actions">
            <button
              type="button"
              className="conflict-primary-button"
              onClick={confirmReplaceCart}
            >
              Start New Selection
            </button>

            <button
              type="button"
              className="conflict-secondary-button"
              onClick={cancelReplaceCart}
            >
              Keep Current Items
            </button>
          </div>

          <div className="restaurant-conflict-dots">• • •</div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantConflictModal;