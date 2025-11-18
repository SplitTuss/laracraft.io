'use client';

import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { session, signin } = useAuth();
  console.log({ session });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signin('lara.loos26.05@gmail.com', 'password123');
    console.log('you have been logged in' + result);
  };

  return (
    <div className="flex justify-center text-2xl mt-4">
      <form className="max-w-md" onSubmit={handleSubmit}>
        <h1>log in!</h1>
        <div className="flex flex-col py-4">
          <input placeholder="email" className="bg-accent p-2 mb-4" type="email" />
          <input placeholder="password" className="bg-accent p-2 mb-4" type="password" />
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
