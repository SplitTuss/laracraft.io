'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import type {
  Session,
  UserResponse,
  AuthResponse,
  AuthTokenResponsePassword,
} from '@supabase/supabase-js';
import { supabase } from './supabase-client';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  signin: (email: string, password: string) => Promise<AuthTokenResponsePassword>;
  signout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  changePassword: (email: string, password: string) => Promise<UserResponse>;
}

const notReadyFunction = () => {
  throw new Error('not ready');
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signup: notReadyFunction,
  signin: notReadyFunction,
  signout: notReadyFunction,
  forgotPassword: notReadyFunction,
  changePassword: notReadyFunction,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_, newSession) => {
      console.log('auth listener', { newSession });
      setSession(newSession);
      setLoading(false);
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

  //forgot password
  const forgotPassword = async (email: string) => {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${BASE_URL}/profile`,
    });
  };
  // reset password
  const changePassword = async (email: string, password: string) => {
    return await supabase.auth.updateUser({ email, password });
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, signup, signout, signin, forgotPassword, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
