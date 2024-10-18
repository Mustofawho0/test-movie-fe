import Carousel from '@/components/carousel';
import CardPlaying from '@/components/card/playing';
import CardPopular from '@/components/card/popular';
export default function Home() {
  return (
    <div className='min-h-screen overflow-hidden'>
      <Carousel />
      <CardPlaying />
      <CardPopular />
    </div>
  );
}
