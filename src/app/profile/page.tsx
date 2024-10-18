'use client';
import * as React from 'react';
import Image from 'next/image';
import { useGetListFavoriteMovie } from '@/api/useGetListFavoriteMovie';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function ProfilPage() {
  const { handleListFavoriteMovie, list } = useGetListFavoriteMovie();

  React.useEffect(() => {
    handleListFavoriteMovie();
  }, [handleListFavoriteMovie]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='font-semibold tracking-wide text-2xl pt-5'>
        Favorite Movie 🎞️
      </h1>
      {list && list.length > 0 ? (
        <div className='grid grid-cols-4 gap-4 py-5'>
          {list.map((item) => (
            <Card className='w-[300px] flex-shrink-0 py-2' key={item.id}>
              <CardContent>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  width={10000}
                  height={10000}
                  priority={true}
                  quality={100}
                  className='h-[250px] w-[300px] rounded-lg'
                />
                <h1 className='pt-2'>
                  ⭐ {item.vote_average.toLocaleString().slice(0, 3)}
                </h1>
                <h1 className='font-semibold tracking-wide'>{item.title}</h1>
                <h1>{new Date(item.release_date).toDateString().slice(3)}</h1>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className='text-xl flex justify-center items-center min-h-screen'>
          No favorite movie
        </p>
      )}
    </div>
  );
}
