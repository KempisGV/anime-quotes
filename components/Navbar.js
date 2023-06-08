import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from '@/styles/Navbar.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import Search from './Search';
import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = ({ handleRefresh }) => {
  const { data: session } = useSession();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchIconClick = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href='/'>
          <Image
            alt='page logo'
            src='/page-logo.png'
            width={175.25}
            height={30.75}
            priority
          />
        </Link>
        <div className={styles.desktopSearch}>
          <Search />
        </div>
      </div>

      <div className={styles.links}>
        <AiOutlineSearch
          size={30}
          color='#aaaaaa'
          className={styles.searchIcon}
          onClick={handleSearchIconClick}
        />
        {session ? (
          <>
            <button onClick={() => signOut()}>Sign out</button>
            {/* Aquí va el botón para agregar imagen */}
          </>
        ) : (
          <button onClick={() => signIn()}>Sign in with Google</button>
        )}
        <button className={styles.refreshBtn} onClick={handleRefresh}>
          Get random characters
        </button>
      </div>

      <div
        className={`${styles.mobileSearch} ${
          showMobileSearch ? styles.show : ''
        }`}
      >
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;
