import { motion } from "framer-motion";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import SwiperCore, { Autoplay, Navigation } from "swiper/core";

SwiperCore.use([Autoplay, Navigation]);
const contentVariants = {
  rest: { opacity: 0, y: 10 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

function Row({ title, movies, big, onMovieClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <SwiperContainer>
        <h1 className="font-bold text-xl sm:text-2xl mb-4 text-white/90 px-[2%]">{title}</h1>
        <StyledSwiper
          spaceBetween={15}
          slidesPerView={6}
          navigation
          breakpoints={{
            320: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 8 },
          }}
        >
          {movies?.map((m) => {
            return (
              <SwiperSlide className="py-2" key={m.id}>
                <Card initial="rest" whileHover="hover" animate="rest">
                  <div
                    onClick={() => onMovieClick(m.id)}
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] active:scale-95 group cursor-pointer border border-white/5 bg-white/5"
                  >
                    <Image
                      className="rounded-2xl md:rounded-3xl"
                      layout="responsive"
                      height={big ? 390 : 200}
                      width={big ? 250 : 300}
                      src={`https://image.tmdb.org/t/p/w500${big ? m.poster_path : m.backdrop_path
                        }`}
                      objectFit="cover"
                      alt={m.title}
                    />

                    <motion.div
                      variants={contentVariants}
                      className="absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-all duration-300 border-t border-white/10"
                    >
                      <div className="flex space-x-3 items-center mb-3">
                        <motion.div
                          onClick={(e) => {
                            e.stopPropagation();
                            onMovieClick(m.id);
                          }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white/20 backdrop-blur-xl w-10 h-10 flex rounded-full items-center justify-center border border-white/40 cursor-pointer hover:bg-white/40 transition shadow-lg"
                        >
                          <BsFillPlayFill className="ml-0.5 text-white text-xl" />
                        </motion.div>
                        <button className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 hover:bg-white/20 transition shadow-md">
                          <AiOutlinePlusCircle className="text-xl text-white" />
                        </button>
                      </div>

                      <div>
                        <p className="text-white text-sm font-bold truncate mb-1">
                          {m.original_name || m.title}
                        </p>
                        <p className="text-white/80 text-[0.65rem] font-medium line-clamp-2 md:line-clamp-3 leading-tight">
                          {m.overview}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </SwiperSlide>
            );
          })}
        </StyledSwiper>
      </SwiperContainer>
    </motion.div>
  );
}

export default Row;

const SwiperContainer = styled.div`
  padding: 0.5rem 0;
`;

const StyledSwiper = styled(Swiper)`
  overflow: visible !important;
  padding: 0 2% !important;

  .swiper-button-next,
  .swiper-button-prev {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    color: white;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::after {
      font-size: 1.2rem;
      font-weight: bold;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.1);
      border-color: rgba(255, 255, 255, 0.4);
    }
  }

  &:hover {
    .swiper-button-next,
    .swiper-button-prev {
      opacity: 1;
    }
  }

  .swiper-button-disabled {
    display: none !important;
  }

  .swiper-slide {
    z-index: 10;
    overflow: visible;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  overflow: visible;
`;
