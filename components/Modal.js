import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import ReactPlayer from "react-player/youtube";
import Image from "next/image";

const dropIn = {
  hidden: {
    y: "10vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "50vh",
    opacity: 0,
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

function Modal({ show, setShow, id }) {
  const [movie, setMovie] = useState({});
  const [trailerId, setTrailerId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9c581c41f799139adb8ddf77aa9fade2&language=en-US`,
        { signal: controller.signal }
      );
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
    getYtvideo(id);

    return () => {
      controller.abort();
      setMovie({});
    };
  }, [id]);

  const getYtvideo = async (id) => {
    const controller = new AbortController();
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9c581c41f799139adb8ddf77aa9fade2&language=en-US`,
      {
        signal: controller.signal,
      }
    );
    const data = await res.json();
    if (data.id) {
      setTrailerId(data?.results[0]?.key);
    }
  };

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
      className="sm:p-3 text-white bg-[rgba(0,0,0,0.7)] flex items-center justify-center fixed z-50 top-0 left-0 right-0 bottom-0 "
    >
      {/* container */}
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full overflow-y-scroll scrollbar-hide  sm:h-[90%] h-full max-w-3xl text-left flex flex-col rounded-lg bg-[#121212]"
      >
        <div className="relative aspect-w-16 aspect-h-9">
          {loading && (
            <div className="absolute w-full h-full p-5 flex flex-col justify-center">
              <div className="animate-pulse bg-gray-700 my-3 w-full h-5 rounded-full"></div>
              <div className="animate-pulse bg-gray-700 my-3 w-full h-5 rounded-full"></div>
              <div className="animate-pulse bg-gray-700 my-3 w-full h-24 rounded-md"></div>
              <div className="animate-pulse bg-gray-700 my-3 w-3/4 h-5 rounded-full"></div>
              <div className="animate-pulse bg-gray-700 my-3 w-1/3 h-5 rounded-full"></div>
            </div>
          )}
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`absolute w-full h-full object-cover ${
              loading && "hidden"
            } `}
            src={`https://image.tmdb.org/t/p/original${
              movie.backdrop_path || movie.poster_path
            }`}
            alt=""
            onLoad={() => setLoading(false)}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setPlaying(false);
              setShow(false);
              setMovie({});
            }}
            className="float-right m-3 text-gray-300 border-2 rounded-full border-gray-300 h-10 w-10 flex items-center justify-center"
          >
            <MdClose fontSize="1.7rem" />
          </motion.button>
        </div>

        {/* content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="p-3 space-y-3"
        >
          <motion.h1 variants={item} className="font-semibold text-4xl">
            {movie.title}
          </motion.h1>
          <motion.p variants={item} className="text-gray-300">
            {movie?.overview}
          </motion.p>
          <div className="h-0.5 my-3 bg-gray-300" />
          <motion.p
            variants={item}
            className="text-gray-400 sm:text-sm text-xs"
          >
            <span>Rating⭐:</span> {movie?.vote_average}
          </motion.p>
          <motion.p
            variants={item}
            className="sm:text-sm text-xs text-gray-400"
          >
            <span className="">Release date📅:</span> {movie?.release_date}
          </motion.p>
          <motion.p
            variants={item}
            className="sm:text-sm text-xs text-gray-400"
          >
            <span>Genres:</span>
            {movie.genres
              ?.map((g) => {
                return g.name;
              })
              .join(", ")}
          </motion.p>
        </motion.div>
        <div className="aspect-w-16 aspect-h-9">
          <ReactPlayer
            width="100%"
            height="100%"
            className=""
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                },
              },
            }}
            playing={playing}
            onStart={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
            url={`https://www.youtube.com/watch?v=${trailerId}-U`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
