'use client';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const useAuthLogin = () => {
  const router = useRouter();
  const handleAuth = async (username: string, password: string) => {
    try {
      const req = await axios.get(
        `${base_url}/authentication/token/new?api_key=${api_key}`
      );
      const request_token = req.data.request_token;

      const res = await axios.post(
        `
      ${base_url}/authentication/token/validate_with_login?api_key=${api_key}`,
        {
          username: username,
          password: password,
          request_token: request_token,
        }
      );
      const session = res.data.request_token;

      const res2 = await axios.post(
        `${base_url}/authentication/session/new?api_key=${api_key}`,
        {
          request_token: session,
        }
      );
      const session_id = res2.data.session_id;

      localStorage.setItem(
        'user',
        JSON.stringify({
          username,
          reqtkn: session,
          sessid: session_id,
        })
      );

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 3000,
      });
      router.push('/');
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login Failed',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  return {
    handleAuth,
  };
};
