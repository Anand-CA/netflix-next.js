import { motion } from "framer-motion";
import Image from "next/image";

function MovieCarousel({ movies, onMovieSelect, activeId }) {
    return (
        <div className="relative w-full px-[4%] z-20">
            <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-6 px-2">
                {movies?.map((movie) => (
                    <motion.div
                        key={movie.id}
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onMovieSelect(movie)}
                        className={`flex-shrink-0 relative w-64 aspect-video rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${activeId === movie.id ? 'ring-2 ring-white/50 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'
                            }`}
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            alt={movie.title || "Movie Thumbnail"}
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-sm font-semibold truncate">{movie.title || movie.name}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default MovieCarousel;
