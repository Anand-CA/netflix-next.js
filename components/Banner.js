import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { banner } from "../utils/motion";

SwiperCore.use([Autoplay]);

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 1 },
  exit: { opacity: 0, y: -20 },
};

export default function Banner({ movies }) {
  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      onSlideChange={() => {}}
      className="relative md:h-[60vh] h-[50vh]"
    >
      {movies
        ?.filter((m) => {
          if (m.backdrop_path && m.overview) {
            return m;
          }
        })
        .map((m) => (
          <SwiperSlide key={m.id} className="flex items-center md:p-8 p-3">
            <Image
              layout="fill"
              className="absolute w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original${
                m.backdrop_path || m.poster_path
              }`}
              alt="banner__image"
              loading="eager"
            />
            {/* fade bg */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, hsl(0, 0%, 0%) 100%)",
              }}
            />
            {/* content */}
            <motion.div
              variants={banner}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col md:space-y-5 space-y-2"
              // className="absolute bottom-12 left-2 space-y-5 sm:left-8"
            >
              <motion.h1
                variants={item}
                className="text-white font-semibold text-2xl sm:text-5xl"
              >
                {m?.original_name || m.name}
              </motion.h1>
              <div className="flex items-center gap-4">
                <motion.button
                  variants={item}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#e50914] md:text-base text-sm md:py-2 py-1.5 md:px-5 px-3 flex items-center gap-1 rounded-[3px]"
                >
                  <BsFillPlayFill fontSize="1.2rem" />
                  Play
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  variants={item}
                  className="bg-[rgba(109,109,110,.7)] flex items-center gap-1 md:text-base text-sm md:py-2 py-1.5 md:px-5 px-3 rounded-[3px]"
                >
                  <IoMdInformationCircleOutline fontSize="1.2rem" /> More Info
                </motion.button>
              </div>
              <motion.p
                variants={item}
                className="max-w-2xl text-sm sm:text-xl line-clamp-3"
              >
                {m?.overview}
              </motion.p>
            </motion.div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
