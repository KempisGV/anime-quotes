import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import { CharacterProvider } from '@/contexts/CharacterContext';
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <CharacterProvider>
        <Component {...pageProps} />
        <Analytics />
      </CharacterProvider>
    </SessionProvider>
  );
}

export default App; // Asegúrate de exportar el componente aquí
