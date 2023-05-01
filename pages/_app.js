import '@/styles/globals.scss'
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App // Asegúrate de exportar el componente aquí

