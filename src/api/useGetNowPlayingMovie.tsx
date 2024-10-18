'use client';
import axios from 'axios';
import { useState } from 'react';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;
export const useGetNowPlayingMovie = () => {
  const [movie, setMovie] = useState<Movie[]>([]);
  const handleGetNowPlayingMovie = async () => {
    try {
      const res = await axios.get(
        `${base_url}/movie/now_playing?api_key=${api_key}&language=en-US&page=1`
      );
      setMovie(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleGetNowPlayingMovie,
    movie,
  };
};
