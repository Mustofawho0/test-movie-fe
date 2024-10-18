'use client';
import axios from 'axios';
import * as React from 'react';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const useGetListFavoriteMovie = () => {
  const [session, setSession] = React.useState('');
  const [list, setList] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const useSession = JSON.parse(user);
      setSession(useSession.sessid);
    }
  }, []);
  const handleListFavoriteMovie = React.useCallback(async () => {
    if (!session) {
      console.log('Session ID is not available yet.');
      return;
    }
    try {
      const res = await axios.get(
        `${base_url}/account/21572506/favorite/movies?api_key=${api_key}&language=en-US&page=1&session_id=${session}&sort_by=created_at.asc`
      );
      setList(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [session]);
  return {
    handleListFavoriteMovie,
    list,
  };
};
