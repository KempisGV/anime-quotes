import Link from 'next/link';
import styles from '@/styles/Navbar.module.scss';

const Navbar = ({handleRefresh}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          AnimeQuotes
        </Link>
      </div>
      <div className={styles.links}>
        <button className={styles.refreshBtn} onClick={handleRefresh}>Get new characters</button>
      </div>
    </nav>
  );
};

export default Navbar;
