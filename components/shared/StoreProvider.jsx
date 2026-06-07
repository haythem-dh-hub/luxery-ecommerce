"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem("toxic-man-cart");

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("toxic-man-cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product) => {
    setCartOpen(true);
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartOpen,
      cartSubtotal,
      addToCart,
      setCartOpen,
      updateQuantity,
    }),
    [cart, cartCount, cartOpen, cartSubtotal],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider.");
  }

  return context;
}
