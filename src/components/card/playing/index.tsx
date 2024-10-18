'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { useGetNowPlayingMovie } from '@/api/useGetNowPlayingMovie';
import { useAddFavoriteMovie } from '@/api/useAddFavoriteMovie';

export default function CardPlaying() {
  const { handleGetNowPlayingMovie, movie } = useGetNowPlayingMovie();
  const { handleAddFavorite } = useAddFavoriteMovie();

  React.useEffect(() => {
    handleGetNowPlayingMovie();
  }, []);

  const handleFavorite = (id: number) => {
    handleAddFavorite(id);
  };

  return (
    <div className='px-[200px]'>
      <h1 className='text-3xl tracking-wide py-2 mt-5'>Now Playing 🎞️</h1>
      <div className='border border-b-2 border-black w-[20vw]' />
      <div className='pt-5 flex gap-4 overflow-x-scroll scrollbar-hide'>
        {movie?.slice(0, 6).map((m, i: number) => (
          <Card className='w-[300px] flex-shrink-0 py-2' key={i}>
            <CardContent>
              <Image
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                alt={m.title}
                width={10000}
                height={10000}
                priority={true}
                quality={100}
                className='h-[250px] w-[300px] rounded-lg'
              />
              <h1 className='pt-2'>
                ⭐ {m.vote_average.toLocaleString().slice(0, 3)}
              </h1>
              <h1 className='font-semibold tracking-wide'>{m.title}</h1>
              <h1>{new Date(m.release_date).toDateString().slice(3)}</h1>
            </CardContent>
            <CardFooter>
              <Button className='w-full' onClick={() => handleFavorite(m.id)}>
                Add to Favorite
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
