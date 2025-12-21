import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";
import { HiPlus, HiPlay } from "react-icons/hi";
import ReactPlayer from "react-player/youtube";
import Image from "next/image";
import styles from "./Modal.module.scss";

const dropIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

function Modal({ show, setShow, id }) {
  const [movie, setMovie] = useState({});
  const [trailerId, setTrailerId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      setMounted(false);
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    async function fetchDetails() {
      setLoading(true);
      try {
        // Try fetching as movie first
        let res = await fetch(
          `https://api.tmdb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
          { signal: controller.signal }
        );
        let data = await res.json();

        // If movie fetch fails or doesn't have a title, try fetching as TV show
        if (data.success === false || (!data.title && !data.name)) {
          res = await fetch(
            `https://api.tmdb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`,
            { signal: controller.signal }
          );
          data = await res.json();
        }

        console.log("Fetched data:", data);
        setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch details:", err);
        }
      }
    }

    async function getTrailer() {
      try {
        // Try movie videos first
        let res = await fetch(
          `https://api.tmdb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
          { signal: controller.signal }
        );
        let data = await res.json();

        // If no results, try TV videos
        if (!data.results || data.results.length === 0) {
          res = await fetch(
            `https://api.tmdb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`,
            { signal: controller.signal }
          );
          data = await res.json();
        }

        const trailer = data?.results?.find(vid => vid.type === "Trailer" || vid.type === "Teaser");
        if (trailer) {
          setTrailerId(trailer.key);
        } else {
          setTrailerId(null);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch trailer:", err);
        }
      }
    }

    fetchDetails();
    getTrailer();

    return () => {
      controller.abort();
    };
  }, [id]);

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShow(false);
    }
  };

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={modalRef}
      onClick={closeModal}
      className={styles.overlay}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.modal}
      >
        {/* Featured Header */}
        <div className={styles.header}>
          {(movie.backdrop_path || movie.poster_path) && (
            <Image
              className={styles.backdrop}
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title || movie.name || "Backdrop"}
              layout="fill"
              objectFit="cover"
              priority
              onLoadingComplete={() => setLoading(false)}
            />
          )}
          {loading && <div className={styles.loadingPlaceholder} />}
          <div className={styles.backdropOverlay} />

          {/* Top Controls */}
          <div className={styles.topControls}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShow(false)}
              className={styles.closeBtn}
            >
              <MdClose />
            </motion.button>
          </div>

          {/* Title & Primary Actions */}
          <div className={styles.titleArea}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.title}
            >
              {movie.title || movie.name}
            </motion.h1>

            <div className={styles.mainActions}>
              <button
                onClick={() => setPlaying(true)}
                className="btn-primary"
              >
                <HiPlay className="text-2xl" />
                Play Trailer
              </button>
              <button className="btn-secondary">
                <HiPlus className="text-2xl" />
                My List
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className={styles.infoGrid}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            <div className={styles.metaRow}>
              <span className={styles.match}>{movie.vote_average ? Math.round(movie.vote_average * 10) : 0}% Match</span>
              <span className={styles.year}>{(movie.release_date || movie.first_air_date)?.split("-")[0]}</span>
              <span className={styles.hdBadge}>
                HD
              </span>
            </div>

            <p className={styles.overview}>
              {movie?.overview}
            </p>
          </div>

          {/* Sidebar Meta */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarLabel}>Genres</span>
              <p className={styles.sidebarValue}>
                {movie.genres?.map((g) => g.name).join(", ")}
              </p>
            </div>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarLabel}>Release Date</span>
              <p className={styles.sidebarValue}>{movie.release_date}</p>
            </div>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarLabel}>Original Language</span>
              <p className={`${styles.sidebarValue} ${styles.uppercase}`}>{movie.original_language}</p>
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        {playing && trailerId && (
          <div className={styles.playerOverlay}>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setPlaying(false)}
              className={styles.playerCloseBtn}
            >
              <MdClose />
            </motion.button>
            <div className={styles.playerWrapper}>
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
    </motion.div>,
    document.body
  );

}

export default Modal;
