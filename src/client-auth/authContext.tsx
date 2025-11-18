'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import type { Session, AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';
import { supabase } from './supabase-client';

interface AuthContextType {
  session: Session | null;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  signin: (email: string, password: string) => Promise<AuthTokenResponsePassword>;
  signout: () => Promise<void>;
}

const notReadyFunction = () => {
  throw new Error('not ready');
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  signup: notReadyFunction,
  signin: notReadyFunction,
  signout: notReadyFunction,
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
      console.log('auth listener', { newSession });
      setSession(newSession);
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  // sign up
  const signup = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  };

  // sign in
  const signin = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  // sign out
  const signout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, signup, signout, signin }}>
      {children}
    </AuthContext.Provider>
  );
};
