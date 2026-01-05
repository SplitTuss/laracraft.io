'use client';

import { useState, createContext, useContext, useEffect } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cart: Array<CartItem>;
}

const notReadyFunction = () => {
  throw new Error('not ready');
};

const CartContext = createContext<CartContextType>({
  cart: [],
});

export const useCart = () => {
  return useContext(CartContext);
};

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState<Array<CartItem>>([]);

  return <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>;
};
