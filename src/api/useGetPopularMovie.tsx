'use client';
import axios from 'axios';
import { useState } from 'react';

interface PopularMovie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const useGetPopularMovie = (page: number) => {
  const [popular, setPopular] = useState<PopularMovie[]>([]);

  const handleGetPopularMovie = async () => {
    try {
      const res1 = await axios.get(
        `${base_url}/movie/popular?api_key=${api_key}&language=en-US&page=${page}`
      );
      const data1 = res1.data.results;
      const res2 = await axios.get(
        `${base_url}/movie/popular?api_key=${api_key}&language=en-US&page=2${page}`
      );
      const data2 = res2.data.results;
      const popularMovies = [...data1, ...data2].slice(0, 30);
      setPopular(popularMovies);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleGetPopularMovie,
    popular,
  };
};
