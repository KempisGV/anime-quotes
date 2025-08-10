import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { CharacterProvider } from "@/contexts/CharacterContext";
import { Analytics } from "@vercel/analytics/react";

function App({ Component, pageProps }) {
  const { session, ...rest } = pageProps || {};
  return (
    <SessionProvider session={session}>
      <CharacterProvider>
        <Component {...rest} />
        <Analytics />
      </CharacterProvider>
    </SessionProvider>
  );
}

export default App;
