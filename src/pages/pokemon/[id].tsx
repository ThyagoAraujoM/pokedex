import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/pokemon.module.scss";
import { PokemonCard } from "../../components/PokemonCard";
import Head from "next/head";
type abilityProps = {
  name: string;
  url: string;
};
type PokemonData = {
  name: string;
  num: (num: string) => string;
  image: string;
  characteristics: {
    height: number;
    weight: string;
    // abilities: abilityProps[];
    gender: string;
  };
  types: [{ name: string }];
  typesOfWeakness: string[];
};

export default function Pokemon() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<PokemonData>();

  function processNum(num) {
    if (num <= 9) {
      return "00" + num;
    }
    if (num <= 99) {
      return "0" + num;
    }
    if (num >= 100) {
      return num;
    }
  }

  async function getTypeWeakness(filteredPokemontypes) {
    let typeOfWeaknesses = [];
    let typeOfResistance = [];

    for (let types in filteredPokemontypes) {
      let typesResponse = await axios.get(
        `https://pokeapi.co/api/v2/type/${filteredPokemontypes[types].type.name}/`
      );

      let typeDoubleDamageFrom =
        typesResponse.data.damage_relations.double_damage_from;
      typeDoubleDamageFrom.forEach((type) => {
        typeOfWeaknesses.push(type.name);
      });
      let typeHalfDamageFrom =
        typesResponse.data.damage_relations.half_damage_from;
      typeHalfDamageFrom.forEach((type) => {
        typeOfResistance.push(type.name);
      });
    }

    typeOfResistance.forEach((type) => {
      typeOfWeaknesses = typeOfWeaknesses.filter((element) => {
        return element != type;
      });
    });

    return typeOfWeaknesses;
  }

  async function getGender(pokemonId: number) {
    let genderResponse = await axios.get(
      `https://pokeapi.co/api/v2/gender/${pokemonId}`
    );

    return genderResponse.data.name;
  }

  useEffect(() => {
    async function getPokemon() {
      let response = await axios.get(`/api/searchPokemon?pokemon=${id}`);
      let data = response.data;
      // let abilities = [];
      // for (let i = 0; i < data.abilities.length; i++) {
      //   if (!data.abilities[i].is_hidden) {
      //     abilities.push(data.abilities[i]);
      //   }
      // }

      let filteredPokemon = {
        id: data.id,
        name: data.name,
        num: processNum(data.order),
        image: data.sprites.other.dream_world.front_default,
        characteristics: {
          height: Number(data.height) * 0.1,
          weight: data.weight,
          // abilities: abilities,
          gender: await getGender(data.id),
        },
        types: data.types.map((dataType) => {
          return { name: dataType.type.name };
        }),
        typesOfWeakness: await getTypeWeakness(data.types),
      };

      setPokemon(filteredPokemon);
    }
    if (id) {
      getPokemon();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          Pokemon Info{" "}
          {pokemon != null
            ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            : null}{" "}
        </title>
      </Head>
      <header className={styles.header}>
        <button className={styles["header-button"]}>
          <img src='' alt='' />
          N°001 Bulbasaur
        </button>
        <button className={styles["header-button"]}>
          Venusaur N°003
          <img src='' alt='' />
        </button>
      </header>
      <main className={styles.main}>
        {pokemon != null ? <PokemonCard pokemonData={pokemon} /> : null}
      </main>
    </>
  );
}
