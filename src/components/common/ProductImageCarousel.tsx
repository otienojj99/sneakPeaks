import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { getImageUrl } from "../../utils/helpers";

interface ProductImageCarouselProps {
  images: { id: number; url: string; is_primary?: boolean }[];
  productName: string;
}

const ProductImageCarousel = ({
  images,
  productName,
}: ProductImageCarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const primaryImage = images.find((img) => img.is_primary) || images[0];

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-100 rounded-lg flex flex-col items-center justify-center">
        <svg
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* main swiper */}

      <div className="w-full h-[500px] rounded-lg overflow-hidden">
        <Swiper
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Pagination, Thumbs]}
          className="w-full h-full"
        >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={getImageUrl(img)}
                alt={productName}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Swiper (only if more than 1 image) */}
      {images.length > 1 && (
        <Swiper
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="h-[110px] rounded-lg"
        >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={getImageUrl(img)}
                alt={productName}
                className="w-full h-full object-contain rounded-md cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductImageCarousel;
