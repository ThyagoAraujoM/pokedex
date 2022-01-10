import React, { ChangeEvent, useState } from "react";
import usePokemon from "../hooks/usePokemon";
import styles from "../styles/home.module.scss";

export default function SearchPokemon() {
  const { loadOnePokemon, getAllPokemons } = usePokemon();
  const [dataInput, setDataInput] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDataInput(e.currentTarget.value);
  }

  async function handleSearchPokemon() {
    try {
      if (dataInput != "") {
        loadOnePokemon(dataInput);
      }
      if (dataInput === "") {
        throw new Error();
      }
    } catch (error) {
      alert("Nome Inválido");
    }
  }

  return (
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
  );
}
