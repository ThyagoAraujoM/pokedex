import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/pokemon.module.scss";
import { PokemonInfoContainer } from "../../components/PokemonInfoContainer";
import Head from "next/head";

type abilityProps = {
  name: string;
  description: string;
};

type PokemonData = {
  name: string;
  num: (num: string) => string;
  image: string;
  characteristics: {
    height: number;
    weight: number;
    abilities: abilityProps[];
    gender: string[];
  };
  types: [{ name: string }];
  typesOfWeakness: string[];
};

export default function Pokemon() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<PokemonData>();

  useEffect(() => {
    async function getPokemonInfo() {
      let { data } = await axios.get<PokemonData>(
        `/api/PokemonInfo?pokemon=${id}`
      );
      setPokemon(data);
    }

    if (id) {
      getPokemonInfo();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          Pokemon Info{" "}
          {pokemon != null
            ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            : null}
        </title>
      </Head>
      <header className={styles.header}>
        <button className={styles["header-button"]}>N°001 Bulbasaur</button>
        <button className={styles["header-button"]}>Venusaur N°003</button>
      </header>
      <main className={styles.main}>
        {pokemon != null ? (
          <PokemonInfoContainer pokemonData={pokemon} />
        ) : null}
      </main>
    </>
  );
}
