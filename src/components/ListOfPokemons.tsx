import React from "react";
import usePokemon from "../hooks/usePokemon";
import styles from "../styles/home.module.scss";
import { PokemonLisItem } from "./PokemonLisItem";

export default function ListOfPokemons() {
  const { allPokemons } = usePokemon();
  return (
    <ul className={styles.listOfPokemons}>
      {allPokemons.map((pokemon, index) => {
        return (
          <PokemonLisItem
            name={pokemon.name}
            sprites={pokemon.sprites}
            types={pokemon.types}
            key={index}
          />
        );
      })}
    </ul>
  );
}
