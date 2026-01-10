'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';
import { useAuth } from '@/client-auth/authContext';
import { Button } from '@/components/shadcn/Button';
import { Input } from '@/components/shadcn/Input';

export default function ChangeEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { session, loading: authLoading, changeEmail } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('change email', { session });
    if (!authLoading && session === null) {
      router.push('/signup');
    }
  }, [session, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setError('enter email');
    }
    if (!EmailValidator.validate(email)) {
      setError('Please enter a valid email address');
    }
    const userData = await changeEmail(email);
    if (email === userData.data.user?.email) {
      setError('can`t change email to same email');
    }
    if (userData.error) {
      setError(userData.error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center text-2xl mt-4 p-4">
      <form className="max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-primary flex justify-center">change email</h1>
        <div className="flex flex-col py-4">
          <h2 className="flex text-center">change email for {session?.user?.email}!</h2>
          <Input
            placeholder="new email"
            className="bg-accent p-2 mb-4"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <div className="text-sm text-red-500 flex flex-wrap justify-center mb-4">{error}</div>
          )}
          <Button type="submit" disabled={loading}>
            change email
          </Button>
        </div>
        <Link href="/profile" className="text-sm underline flex justify-center">
          back to profile
        </Link>
      </form>
    </div>
  );
}
