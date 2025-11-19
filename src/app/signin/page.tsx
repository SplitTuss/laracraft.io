'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/client-auth/authContext';
import { Button } from '@/components/shadcn/Button';
import { Input } from '@/components/shadcn/Input';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { session, signin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('sign in', { session });
    if (session !== null) {
      router.push('/profile');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const userData = await signin(email, password);
    console.log('you have been logged in', userData);
    setLoading(false);
  };

  return (
    <div className="flex justify-center text-2xl mt-4">
      <form className="max-w-md" onSubmit={handleSubmit}>
        <h1>log in!</h1>
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
          <Button type="submit" disabled={loading}>
            sign in
          </Button>
        </div>
        <p className="text-sm flex justify-center">
          don`t have an account yet? <Link href="/signup">go to signup</Link>
        </p>
      </form>
    </div>
  );
}
