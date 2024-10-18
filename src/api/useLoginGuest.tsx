'use client';
import axios from 'axios';

import Swal from 'sweetalert2';

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const useLoginGuest = () => {
  const handleLoginGuest = async () => {
    try {
      const res = await axios.get(
        `${base_url}/authentication/guest_session/new?api_key=${api_key}`
      );
      localStorage.setItem('guest', JSON.stringify(res.data));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleLoginGuest,
  };
};
