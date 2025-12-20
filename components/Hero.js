import { motion } from "framer-motion";
import { HiPlay, HiDownload } from "react-icons/hi";

function Hero({ movie }) {
    if (!movie) return null;

    return (
        <div className="relative h-screen w-full flex items-center px-6 md:px-12 overflow-hidden">
            {/* Background with Blur */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                <div className="absolute inset-0 hero-gradient" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mt-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <span className="glass px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
                        New Trending
                    </span>

                    <div className="space-y-2">
                        <h2 className="text-red-600 font-bold tracking-[0.2em] text-sm italic">NETFLIX</h2>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            {movie.title || movie.name}
                        </h1>
                    </div>

                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed line-clamp-3">
                        {movie.overview}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {["Action", "Adventure", "Animation"].map((genre) => (
                            <span key={genre} className="glass px-4 py-1 rounded-full text-sm border-white/10">
                                {genre}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button className="btn-primary">
                            <HiPlay className="w-6 h-6" />
                            Watch Now
                        </button>
                        <button className="btn-secondary">
                            <HiDownload className="w-5 h-5" />
                            Download
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Overlay Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/20 blur-[150px] rounded-full -mr-64 -mb-64 pointer-events-none" />
        </div>
    );
}

export default Hero;
