'use client';

import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/shadcn/Input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { session, loading: authLoading, forgotPassword } = useAuth();
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

    await forgotPassword(email);
    setLoading(false);
  };

  return (
    <div className="flex justify-center text-2xl mt-4">
      <form className="max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-primary flex justify-center">forgot password</h1>
        <div className="flex flex-col py-4">
          <Input
            placeholder="email to reset password"
            className="bg-accent p-2 mb-4"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            send email
          </Button>
        </div>
        <Link href="/signin" className="text-sm underline flex justify-center">
          back to signin
        </Link>
      </form>
    </div>
  );
}
