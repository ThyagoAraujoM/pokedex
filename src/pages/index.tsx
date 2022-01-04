import Head from "next/head";
import Image from "next/image";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1>Pokedex</h1>
      </header>
      <main className={styles.main}>
        <div>
          <h2>Digite seu Pokemom</h2>
          <input type='text' />
        </div>
        <ul>
          <li></li>
        </ul>
      </main>
      <footer></footer>
    </>
  );
}
