import { motion } from "framer-motion";
import { HiPlay } from "react-icons/hi";

function Hero({ movie, onPlay }) {
    if (!movie) return null;

    const title = movie.title || movie.name || movie.original_name;

    return (
        <section className="relative isolate min-h-[72vh] w-full overflow-hidden bg-black md:min-h-[78vh]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            />

            {/* Readability overlays */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-end px-6 pb-24 pt-32 sm:px-10 md:min-h-[78vh] md:px-12 md:pb-28 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                            Trending Now
                        </span>
                        <span className="text-sm font-medium text-white/70">Netflix</span>
                    </div>

                    <h1 className="max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        {title}
                    </h1>

                    <div className="mt-4 flex items-center gap-3 text-sm text-white/80 md:text-base">
                        {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
                        {movie.vote_average > 0 && (
                            <>
                                <span>•</span>
                                <span>{movie.vote_average.toFixed(1)}/10</span>
                            </>
                        )}
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7 md:text-lg line-clamp-3">
                        {movie.overview}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={onPlay}
                            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/85"
                        >
                            <HiPlay className="h-5 w-5" />
                            Play
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-md bg-white/15 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
                        >
                            More Info
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
