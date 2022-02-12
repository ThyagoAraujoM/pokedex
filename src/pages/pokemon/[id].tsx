import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/pokemon.module.scss";
import { PokemonCard } from "../../components/PokemonCard";
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

  async function getGender(pokemonName: string) {
    let genderless = "";
    let male = "";
    let fem = "";

    let maleResponse = await axios.get(`https://pokeapi.co/api/v2/gender/1`);

    maleResponse.data.pokemon_species_details.forEach((data) => {
      if (data.pokemon_species.name === pokemonName) {
        male = "male";
      }
    });

    let FeminineResponse = await axios.get(
      `https://pokeapi.co/api/v2/gender/2`
    );

    FeminineResponse.data.pokemon_species_details.forEach((data) => {
      if (data.pokemon_species.name === pokemonName) {
        fem = "fem";
      }
    });

    let genderlessResponse = await axios.get(
      `https://pokeapi.co/api/v2/gender/3`
    );
    genderlessResponse.data.pokemon_species_details.forEach((data) => {
      if (data.pokemon_species.name === pokemonName) {
        genderless = "genderless";
      }
    });

    let genders = [];

    male != "" ? genders.push(male) : null;
    fem != "" ? genders.push(fem) : null;
    genderless != "" ? genders.push(genderless) : null;
    return genders;
  }

  useEffect(() => {
    async function getPokemon() {
      let response = await axios.get(`/api/searchPokemon?pokemon=${id}`);
      let data = response.data;
      let abilities = [];
      for (let i = 0; i < data.abilities.length; i++) {
        if (!data.abilities[i].is_hidden) {
          let descriptionAbilityResponse = await axios.get(
            `${data.abilities[i].ability.url}`
          );
          let description =
            descriptionAbilityResponse.data.effect_entries[0].effect;
          abilities.push({
            name: data.abilities[i].ability.name,
            description: description,
          });
        }
      }

      let filteredPokemon = {
        id: data.id,
        name: data.name,
        num: processNum(data.order),
        image: data.sprites.other.dream_world.front_default,
        characteristics: {
          height: Number(data.height) * 0.1,
          weight: Number(data.weight) * 0.1,
          abilities: abilities,
          gender: await getGender(data.name),
        },
        types: data.types.map((dataType) => {
          return { name: dataType.type.name };
        }),
        typesOfWeakness: await getTypeWeakness(data.types),
      };
      console.log(filteredPokemon);
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
