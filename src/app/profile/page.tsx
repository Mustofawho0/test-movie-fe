'use client';
import * as React from 'react';
import Image from 'next/image';
import { useGetListFavoriteMovie } from '@/api/useGetListFavoriteMovie';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpin from '@/components/loader/spin';

export default function ProfilPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { handleListFavoriteMovie, list } = useGetListFavoriteMovie();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    handleListFavoriteMovie();
    return () => clearTimeout(timer);
  }, [handleListFavoriteMovie]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='font-semibold tracking-wide text-2xl pt-5'>
        Favorite Movie 🎞️
      </h1>
      {isLoading ? (
        <div className='flex items-center justify-center min-h-screen'>
          <LoadingSpin />
        </div>
      ) : list && list.length > 0 ? (
        <div className='grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-5 md:px-2'>
          {list.map((item) => (
            <Card
              className='xl:w-[300px] w-[300px] md:w-[240px] flex-shrink-0 py-2'
              key={item.id}
            >
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
