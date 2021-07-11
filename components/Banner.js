import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";

SwiperCore.use([Autoplay]);

export default function Banner({ movies }) {
  console.log("banner", movies);

  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="relative h-xl"
    >
      {movies
        ?.filter((m) => {
          if (m.backdrop_path) {
            return m;
          }
        })
        .map((m) => (
          <SwiperSlide key={m.id} className="">
            <img
              className="absolute w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original${
                m.backdrop_path || m.poster_path
              }`}
              alt=""
            />
            <div className="bg-gradient-to-t from-black absolute h-20 left-0 right-0 bottom-0"></div>
            <div className="absolute bottom-8 left-2 sm:left-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-white font-semibold text-2xl sm:text-5xl"
              >
                {m?.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="my-3 max-w-2xl text-sm sm:text-base line-clamp-3"
              >
                {m?.overview}
              </motion.p>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
