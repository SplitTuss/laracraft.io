'use client';

import { useState, createContext, useContext } from 'react';
import { type Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};
