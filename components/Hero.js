import { motion } from "framer-motion";
import { HiPlay } from "react-icons/hi";
import styles from "./Hero.module.scss";

function Hero({ movie }) {
    if (!movie) return null;

    return (
        <div className={styles.hero}>
            {/* Background with Blur */}
            <div
                className={styles.background}
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 hero-gradient" />
            </div>

            {/* Content */}
            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.stack}
                >
                    <span className={`${styles.badge} glass`}>
                        New Trending
                    </span>

                    <div className={styles.titleArea}>
                        <h2 className={styles.brand}>NETFLIX</h2>
                        <h1 className={styles.title}>
                            {movie.title || movie.name}
                        </h1>
                    </div>

                    <p className={styles.overview}>
                        {movie.overview}
                    </p>

                    <div className={styles.genres}>
                        {["Action", "Adventure", "Animation"].map((genre) => (
                            <span key={genre} className={`${styles.genreTag} glass`}>
                                {genre}
                            </span>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <button className="btn-primary">
                            <HiPlay className="w-6 h-6" />
                            Watch Now
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Overlay Glow */}
            <div className={styles.glow} />
        </div>
    );
}

export default Hero;
