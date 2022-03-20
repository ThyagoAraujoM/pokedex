import React, { useState } from "react";
import usePokemon from "../hooks/usePokemon";
import styles from "../styles/home.module.scss";
import { PokemonLisItem } from "./PokemonLisItem";

export default function ListOfPokemons() {
  const { allPokemons } = usePokemon();
  let countDirection = 0;
  return (
    <ul className={styles.listOfPokemons}>
      {allPokemons.map((pokemon, index) => {
        if (countDirection == 3) {
          countDirection = 0;
        } else {
          countDirection++;
        }

        return (
          <PokemonLisItem
            name={pokemon.name}
            sprite={pokemon.sprite}
            types={pokemon.types}
            key={index}
            animationValue={countDirection}
          />
        );
      })}
    </ul>
  );
}
