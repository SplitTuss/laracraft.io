'use client';

import Link from 'next/link';
import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';

export default function ProfilePage() {
  const { signout } = useAuth();

  const handleLogout = async () => {
    await signout();
    console.log('logging out...');
  };

  return (
    <h1 className="flex flex-col max-w-md justify-center text-2xl mt-4">
      Profile page coming soon...
      <Button onClick={handleLogout}>logout</Button>
      <Link href="/">go home!</Link>
    </h1>
  );
}
