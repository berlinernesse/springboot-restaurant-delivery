import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [pendingCartItem, setPendingCartItem] = useState(null);
  const [showRestaurantConflictModal, setShowRestaurantConflictModal] = useState(false);

  const addToCart = (newItem) => {
    if (cartItems.length === 0) {
      setCartItems([{ ...newItem, quantity: 1 }]);
      return;
    }

    const currentRestaurantId = cartItems[0].restaurantId;

    if (currentRestaurantId !== newItem.restaurantId) {
      console.log("Conflict detected");
      console.log("Current cart restaurant:", currentRestaurantId);
      console.log("New item restaurant:", newItem.restaurantId);

      setPendingCartItem(newItem);
      setShowRestaurantConflictModal(true);
      return;
    }

    const existingItem = cartItems.find((item) => item.id === newItem.id);

    if (existingItem) {
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((currentItems) => [
        ...currentItems,
        { ...newItem, quantity: 1 },
      ]);
    }
  };

  const confirmReplaceCart = () => {
    if (!pendingCartItem) return;

    setCartItems([{ ...pendingCartItem, quantity: 1 }]);
    setPendingCartItem(null);
    setShowRestaurantConflictModal(false);
  };

  const cancelReplaceCart = () => {
    setPendingCartItem(null);
    setShowRestaurantConflictModal(false);
  };

  const removeFromCart = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((currentItems) => {
      if (newQuantity <= 0) {
        return currentItems.filter((item) => item.id !== itemId);
      }

      return currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  }, [cartItems]);

  const fees = useMemo(() => {
    return cartItems.length > 0 ? 4.99 : 0;
  }, [cartItems]);

  const total = useMemo(() => subtotal + fees, [subtotal, fees]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        fees,
        total,
        pendingCartItem,
        showRestaurantConflictModal,
        confirmReplaceCart,
        cancelReplaceCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}