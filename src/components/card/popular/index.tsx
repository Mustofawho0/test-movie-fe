'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Pagination } from 'antd';
import Image from 'next/image';
import { useGetPopularMovie } from '@/api/useGetPopularMovie';
import { useAddFavoriteMovie } from '@/api/useAddFavoriteMovie';

export default function CardPopular() {
  const [page, setPage] = React.useState(1);
  const { handleGetPopularMovie, popular } = useGetPopularMovie(page);
  const { handleAddFavorite } = useAddFavoriteMovie();

  React.useEffect(() => {
    handleGetPopularMovie();
  }, [page]);

  const totalMovie = popular?.length;

  const handleFavorite = (id: number) => {
    handleAddFavorite(id);
  };

  return (
    <div className='px-[200px]'>
      <h1 className='text-3xl tracking-wide py-2 mt-10'>Popular Movie 🔥</h1>
      <div className='border border-b-2 border-black w-[20vw]' />
      <div className='pt-5 flex items-center justify-center'>
        <div className='grid grid-cols-3 gap-4'>
          {popular?.slice(0, 6).map((p, i: number) => (
            <Card className='w-[400px] py-2' key={i}>
              <CardContent>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${p.poster_path}`}
                  alt={p.title}
                  width={10000}
                  height={10000}
                  priority={true}
                  quality={100}
                  className='h-[400px] w-[400px] rounded-lg'
                />
                <h1 className='pt-2'>
                  ⭐ {p.vote_average.toLocaleString().slice(0, 3)}
                </h1>
                <h1 className='font-semibold tracking-wide'>{p.title}</h1>
                <h1>{new Date(p.release_date).toDateString().slice(3)}</h1>
              </CardContent>
              <CardFooter>
                <Button className='w-full' onClick={() => handleFavorite(p.id)}>
                  Add to Favorite
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className='flex justify-center items-center py-5'>
        <Pagination
          onChange={(page) => setPage(page)}
          pageSize={6}
          defaultCurrent={1}
          total={totalMovie}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </div>
  );
}
