'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const CART_LOCAL_STORAGE_KEY = 'cart';

// TYPES: this defines what a cart item looks like
export interface CartItem {
  productId: number;
  quantity: number;
}
// TYPES: this bit defines what the Cart Context looks like
interface CartContextType {
  cart: Array<CartItem>;
  /** Handles updating the cart context. Updates existing items, adds new item if none are found,  and removes items if quantity is 0 */
  updateCart: (item: CartItem) => void;
}

const notReadyFunction = () => {
  throw new Error('not ready');
};

// this is where I set the defaults for Cart Context
const CartContext = createContext<CartContextType>({
  cart: [],
  updateCart: notReadyFunction,
});

// this lets components access the cart
export const useCart = () => {
  return useContext(CartContext);
};

// all of the rest is what wraps my app:
interface CartContextProviderProps {
  children: React.ReactNode;
}

// this is where my state gets stored and provided to the app
export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<Array<CartItem>>([]);

  const handleSetCart = (updatedCart: Array<CartItem>) => {
    setCart(updatedCart);
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const existingCart = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    if (existingCart !== null) {
      setCart(JSON.parse(existingCart));
    }
  }, []);

  const updateCart = (item: CartItem) => {
    const foundItemIndex = cart.findIndex((cartItem) => cartItem.productId === item.productId);
    // if cart item doesn't exist & new quantity is greater than 0, add item to already existing cart array
    if (foundItemIndex === -1 && item.quantity > 0) {
      handleSetCart([...cart, item]);
      toast.info('added to cart');
    } // if cart item exists & new quantity is greater than 0, set existing item quantity to new quantity
    else if (foundItemIndex >= 0 && item.quantity > 0) {
      const newCart = [...cart];
      newCart[foundItemIndex].quantity = item.quantity;
      handleSetCart(newCart);
      toast.info('updated cart');
    } // if cart item exists & new quantity is 0, remove item from cart
    else if (foundItemIndex >= 0 && item.quantity === 0) {
      const newCart = [...cart];
      newCart.splice(foundItemIndex, 1);
      handleSetCart(newCart);
    }
  };

  return <CartContext.Provider value={{ cart, updateCart }}>{children}</CartContext.Provider>;
};
