'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import type { Session, AuthResponse } from '@supabase/supabase-js';
import { supabase } from './supabase-client';

interface AuthContextType {
  session: Session | null;
  signup: (email: string, password: string) => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  signup: () => {
    throw new Error('not ready');
  },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession);
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  const signup = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  };

  return <AuthContext.Provider value={{ session, signup }}>{children}</AuthContext.Provider>;
};
