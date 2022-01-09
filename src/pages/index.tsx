import axios from "axios";
import Image from "next/image";

import { ChangeEvent, useState } from "react";
import styles from "../styles/home.module.scss";

export default function Home() {
  const [dataInput, setDataInput] = useState("");
  const [dataResponse, setDataResponse] = useState([]);
  async function handleSearchPokemon() {
    let response = await axios.get(`/api/pokemonApi?pokemon=${dataInput}`);
    console.log(response.data);
    setDataResponse([response.data]);
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
        <ul className={styles.listOfPokemons}>
          {dataResponse.map((pokemon) => {
            return (
              <li key={pokemon.id} className={styles.pokemonCard}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <div className={styles.pokemonInfoContainer}>
                  <p className={styles.pokemonName}>{pokemon.name}</p>
                  <div className={styles.typesContainer}>
                    {pokemon.types.map((type, index) => {
                      return (
                        <p key={index} className={type.type.name}>
                          {type.type.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <footer></footer>
    </>
  );
}
