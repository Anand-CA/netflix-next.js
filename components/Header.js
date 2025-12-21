import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCollectionPlay } from "react-icons/bs";
import Link from "next/link";
import styles from "./Header.module.scss";

function Header() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShow(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      style={{ backgroundColor: `${show ? "black" : "transparent"}` }}
      className={styles.header}
    >
      <div className={styles.logoWrapper}>
        <Image
          width={100}
          height={50}
          src="https://cdn.worldvectorlogo.com/logos/netflix-3.svg"
          alt="Netflix Logo"
        />
      </div>

      <Link href="/mylist" passHref>
        <div className={styles.myList}>
          <BsCollectionPlay className="text-white text-2xl" />
        </div>
      </Link>
      <Image
        width={40}
        height={40}
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User Avatar"
      />
    </div>
  );
}

export default Header;
