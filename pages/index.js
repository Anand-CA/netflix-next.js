import Head from "next/head";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import requests from "../requests";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Row from "../components/Row";
import Modal from "../components/Modal";

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

  const onMovieClick = (id) => {
    setModalId(id);
    setShowModal(true);
  };

  useEffect(() => {
    if (trending?.results?.length > 0) {
      setActiveMovie(trending.results[0]);
    }
  }, [trending]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Head>
        <title>Netflix - Premium</title>
        <meta name="description" content="Premium Netflix Redesign" />
        <link rel="icon" href="/netflix-icon.svg" />
      </Head>

      <Navbar />

      <main className="relative pb-24 min-h-screen">
        <Hero movie={activeMovie} />

        <div className="relative z-20 space-y-4 bg-black/40 backdrop-blur-3xl pt-4 -mt-32 md:-mt-64">
          <Row onMovieClick={onMovieClick} title="Trending" movies={trending.results} />
          <Row onMovieClick={onMovieClick} title="Action Movies" movies={action.results} />
          <Row onMovieClick={onMovieClick} title="Netflix Originals" movies={netflix.results} big={true} />
          <Row onMovieClick={onMovieClick} title="Top Rated" movies={topRated.results} />
          <Row onMovieClick={onMovieClick} title="Horror Movies" movies={horror.results} />
          <Row onMovieClick={onMovieClick} title="Comedy Movies" movies={comedy.results} />
          <Row onMovieClick={onMovieClick} title="Romance Movies" movies={romance.results} />
          <Row onMovieClick={onMovieClick} title="Documentaries" movies={documentary.results} />
        </div>

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
