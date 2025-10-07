import { useRef } from 'react';

export default function ImageZoom({ src, alt }) {
  const ref = useRef();
  return (
    <div className="relative overflow-hidden rounded-lg cursor-zoom-in">
      <img src={src} alt={alt} className="w-full h-auto transform transition-transform duration-300 hover:scale-110" />
    </div>
  );
}
