import Head from "next/head";
import Row from "../components/Row";
import Banner from "../components/Banner";
import Header from "../components/Header";
import requests from "../requests";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

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
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="netflix home page" />
        <link rel="icon" href="/netflix-icon.svg" />
      </Head>

      <Header />

      <Banner movies={netflix.results} />

      {/* movies */}
      <div className="overflow-hidden">
        <Row title="Trending" movies={trending.results} big={true} />
        <Row title="Action movies" movies={action.results} />
        <Row title="Top rated" movies={topRated.results} />
        <Row title="Horror " movies={horror.results} />
        <Row title="Comedy" movies={comedy.results} />
        <Row title="Romance" movies={romance.results} />
        <Row title="Documentaries" movies={documentary.results} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const [
    trendingRes,
    actionRes,
    netflixRes,
    topRatedRes,
    horrorRes,
    comedyRes,
    romanceRes,
    documentaryRes,
  ] = await Promise.all([
    fetch(`https://api.themoviedb.org/3${requests.fetchTrending}`),
    fetch(`https://api.themoviedb.org/3${requests.fetchActionMovies}`),
    fetch(`https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`),
    fetch(`https://api.themoviedb.org/3${requests.fetchTopRated}`),
    fetch(`https://api.themoviedb.org/3${requests.fetchHorrorMovies}`),
    fetch(`https://api.themoviedb.org/3${requests.fetchComedyMovies}`),
    fetch(`https://api.themoviedb.org/3${requests.fetchRomanceMovies}`),
    fetch(`https://api.themoviedb.org/3${requests.fetchDocumentaries}`),
  ]);
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
    trendingRes.json(),
    actionRes.json(),
    netflixRes.json(),
    topRatedRes.json(),
    horrorRes.json(),
    comedyRes.json(),
    romanceRes.json(),
    documentaryRes.json(),
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
