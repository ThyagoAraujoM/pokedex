import ListOfPokemons from "../components/ListOfPokemons";
import SearchPokemon from "../components/SearchPokemon";
import usePokemon from "../hooks/usePokemon";
import styles from "../styles/home.module.scss";

export default function Home() {
  const { getAllPokemons } = usePokemon();

  return (
    <>
      <header className={styles.header}>
        <h1>Pokedex</h1>
      </header>
      <main id='yourAppElement' className={styles.main}>
        <SearchPokemon />
        <ListOfPokemons />
        <button
          onClick={() => {
            getAllPokemons();
          }}
          className={styles.loadMoreButton}>
          Load More
        </button>
      </main>
    </>
  );
}
