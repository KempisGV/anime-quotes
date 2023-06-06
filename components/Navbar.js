import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = ({ handleRefresh }) => {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href='/'>
          <Image
            alt='page logo'
            src='/page-logo.png'
            width={175.25}
            height={30.75}
          />
        </Link>
      </div>
      <div className={styles.links}>
        {session ? (
          <>
            <button onClick={() => signOut()}>Sign out</button>
            {/* Aquí va el botón para agregar imagen */}
          </>
        ) : (
          <button onClick={() => signIn()}>Sign in with Google</button>
        )}
        <button className={styles.refreshBtn} onClick={handleRefresh}>
          Get new characters
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
