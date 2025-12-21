import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper/core";
import styles from "./Row.module.scss";

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
  const [isInView, setIsInView] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px", // Load slightly before coming into view
        threshold: 0.01,
      }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={styles.container}
      style={{ minHeight: big ? "400px" : "200px" }}
    >
      <h1 className={styles.title}>{title}</h1>
      {isInView ? (
        <Swiper
          className={styles.swiper}
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
              <SwiperSlide key={m.id}>
                <div className={styles.card}>
                  <div
                    onClick={() => onMovieClick(m.id)}
                    className={styles.cardInner}
                  >
                    <Image
                      className={styles.image}
                      layout="responsive"
                      height={big ? 390 : 200}
                      width={big ? 250 : 300}
                      src={`https://image.tmdb.org/t/p/w500${big ? m.poster_path : m.backdrop_path
                        }`}
                      objectFit="cover"
                      alt={m.title}
                      loading="lazy"
                    />

                    <motion.div
                      variants={contentVariants}
                      className={styles.overlay}
                    >
                      <div className={styles.cardActions}>
                        <motion.div
                          onClick={(e) => {
                            e.stopPropagation();
                            onMovieClick(m.id);
                          }}
                          whileTap={{ scale: 0.9 }}
                          className={styles.playBtn}
                        >
                          <BsFillPlayFill />
                        </motion.div>
                        <button className={styles.addBtn}>
                          <AiOutlinePlusCircle />
                        </button>
                      </div>

                      <div>
                        <p className={styles.movieTitle}>
                          {m.original_name || m.title}
                        </p>
                        <p className={styles.movieDescription}>
                          {m.overview}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div style={{ height: big ? "300px" : "150px" }} />
      )}
    </div>
  );
}

export default Row;
