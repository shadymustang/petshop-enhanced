import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

export default function ProductCarousel({ images = [] }) {
  return (
    <Swiper spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }}>
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="relative h-72">
            <Image src={img} alt={`img-${i}`} fill className="object-contain" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
