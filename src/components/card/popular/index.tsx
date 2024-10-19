'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Pagination } from 'antd';
import Image from 'next/image';
import { useGetPopularMovie } from '@/api/useGetPopularMovie';
import { useAddFavoriteMovie } from '@/api/useAddFavoriteMovie';
import LoadingBar from '@/components/loader/bar';

export default function CardPopular() {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleGetPopularMovie, popular } = useGetPopularMovie(page);
  const { handleAddFavorite } = useAddFavoriteMovie();

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    handleGetPopularMovie();
    return () => clearTimeout(timer);
  }, [page]);

  const totalMovie = popular?.length;

  const handleFavorite = (id: number) => {
    handleAddFavorite(id);
  };

  return (
    <div className='xl:px-[200px] lg:px-[100px] sm:px-[25px] mobile:px-[5px]'>
      <h1 className='text-3xl tracking-wide py-2 mt-10'>Popular Movie 🔥</h1>
      <div className='border border-b-2 border-black xl:w-[20vw] mobile:w-[65vw] sm:w-[45vw] md:w-[35vw] lg:w-[30vw]' />
      <div className='pt-5 flex items-center justify-center'>
        <div className='grid xl:grid-cols-2 xxl:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4'>
          {isLoading ? (
            <div className='relative min-h-screen flex items-center justify-center'>
              <LoadingBar />
            </div>
          ) : (
            popular?.slice(0, 6).map((p, i: number) => (
              <Card
                className='lg:w-[400px] mobile:w-[350px] md:w-[350px] xxl:w-[350px] fhd:w-[400px] py-2'
                key={i}
              >
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
                  <Button
                    className='w-full'
                    onClick={() => handleFavorite(p.id)}
                  >
                    Add to Favorite
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
      <div className='md:block mobile:hidden sm:hidden py-5'>
        <Pagination
          onChange={(page) => setPage(page)}
          pageSize={6}
          align='center'
          defaultCurrent={1}
          total={totalMovie}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
      <div className='mobile:block sm:block md:hidden py-5'>
        <Pagination
          total={totalMovie}
          onChange={(page) => setPage(page)}
          pageSize={6}
          defaultCurrent={1}
          align='center'
        />
      </div>
    </div>
  );
}
