'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';
import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';
import { Input } from '@/components/shadcn/Input';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { session, loading: authLoading, signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('sign up', { session });
    if (!authLoading && session !== null) {
      router.push('/profile');
    }
  }, [session, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!EmailValidator.validate(email)) {
      setError('Please enter a valid email address');
    }

    const userData = await signup(email, password);
    if (email === userData.data.user?.email) {
      setError('email is already registered');
    }
    if (userData.error) {
      setError(userData.error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-4">
      <form className="" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-primary flex justify-center">sign up today!</h1>
        <div className="flex flex-col m-4">
          <Input
            placeholder="email"
            className="bg-accent mb-2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            className="bg-accent mb-4"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="text-sm text-red-500 flex flex-wrap justify-center mb-4">{error}</div>
          )}
          <Button type="submit" disabled={loading}>
            sign up
          </Button>
        </div>
        <p className="text-sm flex justify-center">already have an account?</p>
        <Link href="/signin" className="text-sm underline flex justify-center">
          go to signin
        </Link>
      </form>
    </div>
  );
}
