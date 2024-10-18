'use client';
import * as React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const useAddFavoriteMovie = () => {
  const [session, setSession] = React.useState('');

  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const useSession = JSON.parse(user);
      setSession(useSession.sessid);
    }
  }, []);

  const handleAddFavorite = async (id: number) => {
    try {
      await axios.post(
        `${base_url}/account/21572506/favorite?api_key=${api_key}&session_id=${session}`,
        {
          media_type: 'movie',
          media_id: id,
          favorite: true,
        }
      );
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Add Favorite Success',
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login First!',
        text: 'Cannot add to favorite with guest account, please login to your account',
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };
  return {
    handleAddFavorite,
  };
};
