import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/pokemon.module.scss";

type PokemonData = {
  name: string;
  num: (num: string) => string;
  image: string;
  characteristics: {
    height: string;
    weight: string;
    abilities: string;
  };
  types: { string };
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

  // async function getEvolutions(pokemon) {
  //   let response = await axios.get(
  //     `https://pokeapi.co/api/v2/evolution-chain/${pokemon.id}/`
  //   );
  //   let pokemonsData = response.data.chain;
  //   let processedPokemon = "";
  //   let actualEnvolvePhase = pokemonsData;

  //   for (let i = 0; i < 2; i++) {
  //     i -= 1;
  //     if (processedPokemon != "") {
  //       actualEnvolvePhase = actualEnvolvePhase.evolves_to;
  //     }

  //     let typesResponse = await axios.get(
  //       `https://pokeapi.co/api/v2/type/${pokemon.id}/`
  //     );
  //     let typesData = typesResponse.data;
  //     console.log(actualEnvolvePhase);
  //     processedPokemon += `
  //           <div>
  //             <img src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
  //               actualEnvolvePhase.id
  //             }.png' alt='' />
  //             <p>
  //               ${actualEnvolvePhase.species.name} <span> Nº ${processNum(
  //       actualEnvolvePhase.id
  //     )}</span>
  //             </p>

  //             <div>

  //           </div>`;
  //     // ${typesData.name.map((type) => {
  //     //   return `<p>${type}</p>`;
  //     // })}
  //   }

  //   return `
  //         <div>
  //           <h2>Evoluções</h2>
  //           ${processNum}
  //           </div>

  //         </div>`;
  // }

  async function createPokemonCard(filteredPokemon) {
    let typeOfWeaknesses = [];
    let typeOfResistance = [];

    //   return `<p class="${dataType.type.name}">${dataType.type.name}</p>`;

    for (let types in filteredPokemon.types) {
      let typesResponse = await axios.get(
        `https://pokeapi.co/api/v2/type/${filteredPokemon.types[types].type.name}/`
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

    return ` <img src=${filteredPokemon.image} alt='' />
        <div>
          <p>
            Height <span>${filteredPokemon.characteristics.height}m</span>{" "}
          </p>
          <p>
            Weight <span>${filteredPokemon.characteristics.weight}kg</span>{" "}
          </p>
          <p>
          ${filteredPokemon.characteristics.abilities.map((abilityData) => {
            return `Abilities <span>${abilityData.ability.name}</span>`;
          })}
          </p>
        </div>
        <div>
          <div>
            <h3>Type</h3>
         
          </div>
          <div>
            <h3>Weaknesses</h3>
            ${filteredPokemon.types.map((typeInfo) => {})}
          </div>
        </div>
        
        </div>
    `;
  }

  useEffect(() => {
    async function getPokemon() {
      let response = await axios.get(`/api/searchPokemon?pokemon=${id}`);
      let data = response.data;

      let filteredPokemon = {
        id: data.id,
        name: data.name,
        num: processNum(data.order),
        image: data.sprites.other.dream_world.front_default,
        characteristics: {
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
        },
        types: data.types,
      };

      let cardPokemon = await createPokemonCard(filteredPokemon);

      setPokemon(cardPokemon);
    }
    if (id) {
      getPokemon();
    }
  }, [id]);

  return (
    <>
      <header className={styles.header}>
        <button className={styles["header-button"]}>
          <img src='' alt='' />
          N°001 Bulbasaur
        </button>
        <button className={styles["header-button"]}>
          Venusaur N°003
          <img src='' alt='' />
        </button>
        <h2>{pokemon != null ? `${pokemon.name} N° ${pokemon.num}` : null}</h2>
      </header>
      <main className={styles.main}></main>
    </>
  );
}
