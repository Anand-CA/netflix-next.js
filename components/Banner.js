import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { banner } from "../utils/motion";
import styles from "./Banner.module.scss";

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
      onSlideChange={() => { }}
      className={styles.swiper}
    >
      {movies
        ?.filter((m) => {
          if (m.backdrop_path && m.overview) {
            return m;
          }
        })
        .map((m) => (
          <SwiperSlide key={m.id} className={styles.slide}>
            <Image
              layout="fill"
              className={styles.image}
              src={`https://image.tmdb.org/t/p/original${m.backdrop_path || m.poster_path
                }`}
              alt="banner__image"
              loading="eager"
            />
            {/* fade bg */}
            <div className={styles.fade} />
            {/* content */}
            <motion.div
              variants={banner}
              initial="hidden"
              animate="show"
              exit="exit"
              className={styles.content}
            >
              <motion.h1
                variants={item}
                className={styles.title}
              >
                {m?.original_name || m.name}
              </motion.h1>
              <div className={styles.actions}>
                <motion.button
                  variants={item}
                  whileTap={{ scale: 0.9 }}
                  className={styles.playBtn}
                >
                  <BsFillPlayFill fontSize="1.2rem" />
                  Play
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  variants={item}
                  className={styles.infoBtn}
                >
                  <IoMdInformationCircleOutline fontSize="1.2rem" /> More Info
                </motion.button>
              </div>
              <motion.p
                variants={item}
                className={styles.overview}
              >
                {m?.overview}
              </motion.p>
            </motion.div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
