import { useState } from "react";
import Image from "next/image";
import { HiSearch, HiBell, HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";
import styles from "./Navbar.module.scss";

function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch?.(value);
    };

    return (
        <nav className={styles.nav}>
            <div className={`${styles.inner} glass`}>
                {/* Left: Navigation Arrows */}
                <div className={styles.left}>
                    <div className={styles.arrows}>
                        <button className={styles.arrowBtn}>
                            <HiChevronLeft />
                        </button>
                        <button className={styles.arrowBtn}>
                            <HiChevronRight />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className={styles.searchGroup}>
                        <HiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search movies, shows..."
                            className={styles.searchInput}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => { setSearchTerm(""); onSearch?.(""); }}
                                className={styles.clearBtn}
                            >
                                <HiX />
                            </button>
                        )}
                    </div>
                </div>

                {/* Right: User Menu */}
                <div className={styles.right}>
                    <button className={styles.bellBtn}>
                        <HiBell />
                        <span className={styles.notificationBadge}></span>
                    </button>

                    <div className={styles.userMenu}>
                        <div className={styles.avatarWrapper}>
                            <Image
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"
                                alt="User"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <span className={styles.userName}>Agung Hapsah</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
