import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { HiPlus, HiPlay } from "react-icons/hi";
import ReactPlayer from "react-player/youtube";
import Image from "next/image";

const dropIn = {
  hidden: {
    y: "5vh",
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    y: "5vh",
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

function Modal({ show, setShow, id }) {
  const [movie, setMovie] = useState({});
  const [trailerId, setTrailerId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.tmdb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    }

    async function getYtvideo() {
      try {
        const res = await fetch(
          `https://api.tmdb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
          { signal: controller.signal }
        );
        const data = await res.json();
        const trailer = data?.results?.find(vid => vid.type === "Trailer" || vid.type === "Teaser");
        if (trailer) {
          setTrailerId(trailer.key);
        }
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
    }

    fetchMovie();
    getYtvideo();

    return () => {
      controller.abort();
    };
  }, [id]);

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShow(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={modalRef}
      onClick={closeModal}
      className="modal-scrollbar fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto overflow-x-hidden pt-10 pb-10"
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-5xl my-auto mx-auto rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Featured Header */}
        <div className="relative aspect-video w-full group">
          <img
            className={`w-full h-full object-cover transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            onLoad={() => setLoading(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

          {/* Top Controls */}
          <div className="absolute top-6 right-6 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShow(false)}
              className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition shadow-xl"
            >
              <MdClose className="text-2xl" />
            </motion.button>
          </div>

          {/* Title & Primary Actions */}
          <div className="absolute bottom-10 left-10 right-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl"
            >
              {movie.title}
            </motion.h1>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setPlaying(true)}
                className="btn-primary flex items-center gap-2 group"
              >
                <HiPlay className="text-2xl group-hover:scale-110 transition" />
                Play Trailer
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <HiPlus className="text-2xl" />
                My List
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-green-500 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
              <span className="text-gray-400">{movie.release_date?.split("-")[0]}</span>
              <span className="px-1.5 py-0.5 border border-gray-600 text-[10px] text-gray-400 rounded uppercase">
                HD
              </span>
            </div>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
              {movie?.overview}
            </p>
          </div>

          {/* Sidebar Meta */}
          <div className="space-y-6 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">Genres</span>
              <p className="text-gray-200">
                {movie.genres?.map((g) => g.name).join(", ")}
              </p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Release Date</span>
              <p className="text-gray-200">{movie.release_date}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Original Language</span>
              <p className="text-gray-200 uppercase">{movie.original_language}</p>
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        {playing && trailerId && (
          <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center p-4">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setPlaying(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-[120]"
            >
              <MdClose className="text-2xl" />
            </motion.button>
            <div className="w-full h-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerId}`}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                onEnded={() => setPlaying(false)}
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
