import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import requests, { apiKey } from "../requests";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Row from "../components/Row";
import Modal from "../components/Modal";
import styles from "../styles/Home.module.scss";

export default function Home({
  trending,
  action,
  netflix,
  topRated,
  horror,
  comedy,
  romance,
  documentary,
}) {
  const [activeMovie, setActiveMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onMovieClick = useCallback((id) => {
    setModalId(id);
    setShowModal(true);
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.tmdb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  useEffect(() => {
    if (trending?.results?.length > 0) {
      setActiveMovie(trending.results[0]);

      const interval = setInterval(() => {
        if (!searchQuery) {
          setActiveMovie((current) => {
            if (!current) return trending.results[0];
            const currentIndex = trending.results.findIndex(m => m.id === current.id);
            const nextIndex = (currentIndex + 1) % Math.min(trending.results.length, 10);
            return trending.results[nextIndex];
          });
        }
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [trending, searchQuery]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cineva - Premium Streaming</title>
        <meta name="description" content="Cineva - Premium movie streaming experience" />
        <link rel="icon" href="/netflix-icon.svg" />
      </Head>

      <Navbar onSearch={handleSearch} />

      <main className={styles.main}>
        {searchQuery ? (
          <div className={styles.resultsContainer}>
            <h2 className={styles.resultsTitle}>Results for &quot;{searchQuery}&quot;</h2>
            {searchResults.length > 0 ? (
              <Row onMovieClick={onMovieClick} title="" movies={searchResults} />
            ) : (
              <p className={styles.noResults}>No movies found. Try searching for something else.</p>
            )}
          </div>
        ) : (
          <>
            <Hero movie={activeMovie} />

            {/* First Row: Integrated with Hero */}
            <div className={styles.trendingWrapper}>
              <Row onMovieClick={onMovieClick} title="Trending" movies={trending.results} />
            </div>

            {/* Remaining Rows: Glassmorphism Pane */}
            <div className={`${styles.rowsContainer} glass-pane`}>
              <Row onMovieClick={onMovieClick} title="Action Movies" movies={action.results} />
              <Row onMovieClick={onMovieClick} title="Netflix Originals" movies={netflix.results} big={true} />
              <Row onMovieClick={onMovieClick} title="Top Rated" movies={topRated.results} />
              <Row onMovieClick={onMovieClick} title="Horror Movies" movies={horror.results} />
              <Row onMovieClick={onMovieClick} title="Comedy Movies" movies={comedy.results} />
              <Row onMovieClick={onMovieClick} title="Romance Movies" movies={romance.results} />
              <Row onMovieClick={onMovieClick} title="Documentaries" movies={documentary.results} />
            </div>
          </>
        )}

        <AnimatePresence exitBeforeEnter>
          {showModal && <Modal show={showModal} setShow={setShowModal} id={modalId} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const safeFetch = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch failed");
      return await res.json();
    } catch (e) {
      console.error(`Error fetching ${url}:`, e);
      return { results: [] };
    }
  };

  const [
    trending,
    action,
    netflix,
    topRated,
    horror,
    comedy,
    romance,
    documentary,
  ] = await Promise.all([
    safeFetch(`https://api.tmdb.org/3${requests.fetchTrending}`),
    safeFetch(`https://api.tmdb.org/3${requests.fetchActionMovies}`),
    safeFetch(`https://api.tmdb.org/3${requests.fetchNetflixOriginals}`),
    safeFetch(`https://api.tmdb.org/3${requests.fetchTopRated}`),
    safeFetch(`https://api.tmdb.org/3${requests.fetchHorrorMovies}`),
    safeFetch(`https://api.tmdb.org/3${requests.fetchComedyMovies}`),
    safeFetch(`https://api.tmdb.org/3${requests.fetchRomanceMovies}`),
    safeFetch(`https://api.tmdb.org/3${requests.fetchDocumentaries}`),
  ]);

  return {
    props: {
      trending,
      action,
      netflix,
      topRated,
      horror,
      comedy,
      romance,
      documentary,
    },
  };
}
