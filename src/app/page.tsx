'use client';
import { useState, useEffect } from 'react';
import Carousel from '@/components/carousel';
import CardPlaying from '@/components/card/playing';
import CardPopular from '@/components/card/popular';
import Loading from '@/components/loader';
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen overflow-hidden'>
      {isLoading ? (
        <div className='flex items-center justify-center min-h-screen'>
          <Loading />
        </div>
      ) : (
        <>
          <Carousel />
          <CardPlaying />
          <CardPopular />
        </>
      )}
    </div>
  );
}
