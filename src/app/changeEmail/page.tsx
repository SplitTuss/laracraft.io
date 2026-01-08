'use client';

import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/shadcn/Input';

export default function ChangeEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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

    const userData = await changeEmail(email);
    console.log(userData);
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
          <Button
            type="submit"
            disabled={loading}
            onClick={() => {
              toast.info('email verification link sent!');
            }}
          >
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
