'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BookTextIcon, MailIcon, KeyIcon } from 'lucide-react';
import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';
import Header from '@/components/header';

export default function ProfilePage() {
  const { session, loading, signout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('profile page', { session });
    if (!loading && session === null) {
      router.push('/signin');
    }
  }, [session, loading, router]);

  const handleLogout = async () => {
    await signout();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-4 sm:gap-15">
        <h2 className="mt-10 sm:mt-15 text-2xl">{session?.user?.email}`s profile</h2>
        <div className="flex flex-col items-center gap-8 mt-5 p-8 bg-accent-foreground/10 border-accent-foreground/10 border-2 rounded-xl">
          <Link
            href="/orders"
            className="flex flex-row items-center mb-8 p-2 text-xl hover:text-primary bg-accent-foreground/5 border-accent-foreground/10 border rounded-xl underline"
          >
            <BookTextIcon size={18} className="mt-1 mr-2" />
            my orders
          </Link>
          <Link
            href="/changeEmail"
            className="flex flex-row items-center p-2 text-xl hover:text-primary bg-accent-foreground/5 border-accent-foreground/10 border rounded-xl underline"
          >
            <MailIcon size={18} className="mt-1 mr-2" />
            change email
          </Link>
          <Link
            href="/changePassword"
            className="flex flex-row items-center p-2 text-xl hover:text-primary bg-accent-foreground/5 border-accent-foreground/10 border rounded-xl  underline"
          >
            <KeyIcon size={18} className="mt-1 mr-2" />
            change password
          </Link>
          <Button onClick={handleLogout} variant="outline">
            logout
          </Button>
        </div>
      </div>
    </>
  );
}
