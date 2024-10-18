'use client';

import Navbar from '@/components/navbar/index';
import { usePathname } from 'next/navigation';

export default function NavbarPath() {
  const path = usePathname();
  const loginUsers = '/auth/login';

  return <>{path.includes(loginUsers) ? null : <Navbar />}</>;
}
