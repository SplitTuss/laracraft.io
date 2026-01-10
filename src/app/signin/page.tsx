'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as EmailValidator from 'email-validator';
import { useAuth } from '@/client-auth/authContext';
import { Button } from '@/components/shadcn/Button';
import { Input } from '@/components/shadcn/Input';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { session, loading: authLoading, signin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && session !== null) {
      router.push('/profile');
    }
  }, [session, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!password) {
      setError('enter password');
    }
    if (!email) {
      setError('enter email');
    }
    if (!EmailValidator.validate(email)) {
      setError('Please enter a valid email address');
    }
    const userData = await signin(email, password);
    if (userData.error) {
      setError(userData.error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center text-2xl mt-4">
      <form className="max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-primary flex justify-center">log in!</h1>
        <div className="flex flex-col py-4">
          <Input
            placeholder="email"
            className="bg-accent p-2 mb-4"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            className="bg-accent p-2 mb-4"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="text-sm text-red-500 flex flex-wrap justify-center mb-4">{error}</div>
          )}
          <div className="mb-2 underline">
            <Link href="/forgotPassword" className="text-sm flex justify-center">
              forgot password?
            </Link>
          </div>
          <Button type="submit" disabled={loading}>
            sign in
          </Button>
        </div>
        <p className="text-sm flex justify-center">don`t have an account yet? </p>
        <Link href="/signup" className="text-sm underline flex justify-center">
          go to signup
        </Link>
      </form>
    </div>
  );
}
