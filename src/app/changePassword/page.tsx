'use client';

import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/shadcn/Input';

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { session, loading: authLoading, changePassword } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('changePassword', { session });
    if (!authLoading && session === null) {
      router.push('/signup');
    }
  }, [session, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!password) {
      setError('enter password');
    }
    const userData = await changePassword(password);
    if (userData.error) {
      setError(userData.error.message);
    }
    console.log(userData);
    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-4 p-4">
      <form className="max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-primary flex justify-center">change password</h1>
        <div className="flex flex-col py-4">
          <h2 className="flex text-center">change password for {session?.user?.email}!</h2>
          <Input
            placeholder="new password"
            className="bg-accent mt-2 p-2 mb-4"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="text-sm text-red-500 flex flex-wrap justify-center mb-4">{error}</div>
          )}
          <Button type="submit" disabled={loading}>
            change password
          </Button>
        </div>
        <Link href="/profile" className="text-sm underline flex justify-center">
          back to profile
        </Link>
      </form>
    </div>
  );
}
