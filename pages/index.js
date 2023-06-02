import Head from 'next/head';
import { Bangers } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { useEffect, useState } from 'react';
import Quote from '@/components/Quote';
import Navbar from '@/components/Navbar';
import { FiRefreshCcw } from 'react-icons/fi';

const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const [list, setList] = useState([]);
  async function fetchData() {
    const response = await fetch('http://animechan.melosh.space/quotes');
    const data = await response.json();
    return data;
  }

  async function handleRefresh() {
    const data = await fetchData();
    setList(data);
  }

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <>
      <Head>
        <title>Anime quotes</title>
        <meta name='description' content='Quotes from anime characters 🗾' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${bangers.className}`}>
        <Navbar handleRefresh={handleRefresh} />
        <button className={styles.floatingButton} onClick={handleRefresh}>
          <FiRefreshCcw />
        </button>
        <div className={styles.quoteContainer}>
          {list.map(character => (
            <Quote
              key={`${character.character}-${character.anime}`}
              character={character.character}
              anime={character.anime}
              quote={character.quote}
            />
          ))}
        </div>
      </main>
    </>
  );
}
