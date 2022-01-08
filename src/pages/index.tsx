import axios from "axios";

import { ChangeEvent, useState } from "react";
import styles from "../styles/home.module.scss";

export default function Home() {
  const [dataInput, setDataInput] = useState("");

  async function handleSearchPokemon() {
    let response = await axios.get(`/api/pokemonApi?pokemon=${dataInput}`);
    
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDataInput(e.currentTarget.value);
  }

  return (
    <>
      <header className={styles.header}>
        <h1>Pokedex</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.choosePokemonContainer}>
          <h2>Escolha seu Pokemom</h2>

          <div className={styles.inputContainer}>
            <input
              value={dataInput}
              onChange={(e) => {
                handleChange(e);
              }}
              type='text'
            />
            <button onClick={handleSearchPokemon}>Enviar</button>
          </div>
        </div>
        <ul></ul>
      </main>
      <footer></footer>
    </>
  );
}
