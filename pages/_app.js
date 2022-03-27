import "../styles/globals.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  // key={router.route} is important for exit animation
  return (
    <AnimatePresence exitBeforeEnter>
      <Component key={router.route} {...pageProps} />;
    </AnimatePresence>
  );
}

export default MyApp;
