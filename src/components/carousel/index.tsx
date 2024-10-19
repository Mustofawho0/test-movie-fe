'use client';
import * as React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useGetNowPlayingMovie } from '@/api/useGetNowPlayingMovie';

export default function Carousel() {
  const { handleGetNowPlayingMovie, movie } = useGetNowPlayingMovie();

  React.useEffect(() => {
    handleGetNowPlayingMovie();
  }, []);

  var settings = {
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='relative fhd:max-w-screen-xxl lg:max-w-screen-xl mx-auto py-1 px-2'>
      <Slider {...settings}>
        {movie.slice(0, 5).map((m, i: number) => (
          <div key={i} className='relative w-full'>
            <Image
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt={m.title}
              width={10000}
              height={10000}
              priority={true}
              quality={100}
              className='lg:h-[700px] xl:h-[750px] rounded-lg w-full mobile:h-[500px] h-[500px]'
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
