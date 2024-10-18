'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { FilmIcon } from 'lucide-react';
import { useLoginGuest } from '@/api/useLoginGuest';

export default function Navbar() {
  const [username, setUsername] = React.useState<string | null>(null);
  const [guest, setGuest] = React.useState<boolean | null>(null);

  const { handleLoginGuest } = useLoginGuest();

  React.useEffect(() => {
    const getUser = localStorage.getItem('user');
    const getGuest = localStorage.getItem('guest');
    if (getUser) {
      const user = JSON.parse(getUser);
      setUsername(user.username);
    } else if (getGuest) {
      const guestRes = JSON.parse(getGuest);
      setGuest(guestRes.success);
    }
  }, []);

  const handleGuest = async () => {
    await handleLoginGuest();
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logout Success!',
          icon: 'success',
          showConfirmButton: false,
        }).then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('guest');
          setGuest(null);
          setUsername(null);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      }
    });
  };

  return (
    <nav className='px-[200px] p-4 border-b border-gray-400 gap-4 rounded-b-2xl shadow-lg'>
      <div className='flex items-center justify-between'>
        <Link href={'/'}>
          <span className='text-2xl tracking-wide flex items-center gap-2'>
            Move-Movie <FilmIcon />
          </span>
        </Link>
        <div className='flex gap-4 items-center'>
          {username ? (
            <>
              <Link href={'/profile'}>
                <p>welcome, {username}!</p>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : guest === true ? (
            <>
              <p>welcome, Guest!</p>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href={'/auth/login'}>
                <Button>Login</Button>
              </Link>
              <Button variant='outline' onClick={handleGuest}>
                As Guest
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
