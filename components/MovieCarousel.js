import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./MovieCarousel.module.scss";

function MovieCarousel({ movies, onMovieSelect, activeId }) {
    return (
        <div className={styles.container}>
            <div className={`${styles.scrollArea} custom-scrollbar`}>
                {movies?.map((movie) => (
                    <motion.div
                        key={movie.id}
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onMovieSelect(movie)}
                        className={`${styles.card} ${activeId === movie.id ? styles.active : ''}`}
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            alt={movie.title || "Movie Thumbnail"}
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className={styles.overlay}>
                            <p className={styles.title}>{movie.title || movie.name}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default MovieCarousel;
