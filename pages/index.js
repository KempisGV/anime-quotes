import Head from 'next/head';
import { Bangers, Oswald } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { useContext, useEffect, useCallback } from 'react';
import { CharacterContext } from '@/contexts/CharacterContext';
import Quote from '@/components/Quote';
import Navbar from '@/components/Navbar';
import { FiRefreshCcw } from 'react-icons/fi';
const serverURL = process.env.NEXT_PUBLIC_API_URL;

// const bangers = Bangers({
//   weight: '400',
//   subsets: ['latin'],
// });

const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const [characterList, setCharacterList] = useContext(CharacterContext);
  async function fetchData() {
    const response = await fetch(`${serverURL}/characters`);
    const data = await response.json();
    return data;
  }

  const handleRefresh = useCallback(async () => {
    const data = await fetchData();
    setCharacterList(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <>
      <Head>
        <title>Anime quotes</title>
        <meta name='description' content='Quotes from anime characters 🗾' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${oswald.className}`}>
        <Navbar handleRefresh={handleRefresh} />
        <button className={styles.floatingButton} onClick={handleRefresh}>
          <FiRefreshCcw />
        </button>
        <div className={styles.quoteContainer}>
          {characterList.map(character => (
            <Quote key={character._id} character={character} />
          ))}
        </div>
      </main>
    </>
  );
}
