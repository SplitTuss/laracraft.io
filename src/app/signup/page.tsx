'use client';

import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { session, signup } = useAuth();
  console.log({ session });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signup('lara.loos26.05@gmail.com', 'password123');
    console.log(result);
  };

  return (
    <div className="flex justify-center text-2xl mt-4">
      <form className="max-w-md" onSubmit={handleSubmit}>
        <h1>sign up today!</h1>
        <div className="flex flex-col py-4">
          <input placeholder="email" className="bg-accent p-2 mb-4" type="email" />
          <input placeholder="password" className="bg-accent p-2 mb-4" type="password" />
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
