import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

function Row({ title, movies, big }) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {show && <Modal show={show} setShow={setShow} id={id} />}
      </AnimatePresence>

      <SwiperContainer
        style={{
          padding: big ? "1.5% 2rem 4.5% 2rem" : "0 2rem 2% 2rem",
        }}
      >
        <h1 className="font-bold text-xl sm:text-2xl mb-3">{title}</h1>
        <StyledSwiper
          big={big}
          spaceBetween={2}
          slidesPerView={6}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1536: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {movies.map((m) => {
            return (
              <SwiperSlide className="group" key={m.id}>
                <Image
                  className="rounded-md"
                  layout="responsive"
                  height={big ? 390 : 200}
                  width={big ? 250 : 300}
                  src={`https://image.tmdb.org/t/p/original${
                    big ? m.poster_path : m.backdrop_path
                  }`}
                  objectFit="cover"
                  alt={m.title}
                />

                <div className="group-hover:flex group-hover:animation-fadeUp flex-col duration-1000  hidden absolute bottom-3  left-3">
                  <div className="flex space-x-3 items-center">
                    <motion.div
                      onClick={() => {
                        setId(m.id);
                        setShow(true);
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white w-8 h-8 flex rounded-full items-center justify-center"
                    >
                      <BsFillPlayFill className="ml-0.5 text-black text-xl" />
                    </motion.div>
                    <div>
                      <AiOutlinePlusCircle className="text-2xl" />
                    </div>
                  </div>

                  <div>
                    <p
                      className={`text-white ${
                        big ? "sm:text-md text-lg" : "text-md sm:text-lg"
                      } font-semibold line-clamp-1`}
                    >
                      {m.original_name || m.title}
                    </p>
                    <p className="line-clamp-2 text-[.7rem]">{m.overview}</p>
                  </div>
                </div>
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
  overflow-x: hidden;
`;

const StyledSwiper = styled(Swiper)`
  overflow: initial;
  /* navigation */
  .swiper-button-next,
  .swiper-button-prev {
    transform: scale(0.6);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 4.3rem;
    height: 4.3rem;
  }
  .swiper-slide {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  }

  &:hover {
    .swiper-slide {
      transform: translateX(-15%);
      opacity: 0.5;

      /* first element */

      &:first-child {
        &:hover {
          transform: scale(1.3) translateX(15%);
          opacity: 1;

          ~ .swiper-slide {
            transform: translateX(35%);
          }
        }
      }

      &:hover {
        transform: scale(1.3);
        opacity: 1;

        ~ .swiper-slide {
          transform: translateX(15%);
        }
      }
    }
  }
`;

export const Content = styled.div``;
