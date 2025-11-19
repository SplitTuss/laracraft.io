'use client';

import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/shadcn/Input';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { session, signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('sign up', { session });
    if (session !== null) {
      router.push('/profile');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const userData = await signup(email, password);
    console.log(userData);
    setLoading(false);
  };

  return (
    <div className="flex justify-center text-2xl mt-4">
      <form className="max-w-md" onSubmit={handleSubmit}>
        <h1>sign up today!</h1>
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
            sign up
          </Button>
        </div>
        <p className="text-sm flex justify-center">
          already have an account? <Link href="/signin"> go to signin</Link>
        </p>
      </form>
    </div>
  );
}
