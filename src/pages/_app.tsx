import Head from "next/head";
import PokemonContextProvider from "../context/PokemonContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PokemonContextProvider>
        <Component {...pageProps} />
      </PokemonContextProvider>
    </>
  );
}

export default MyApp;
