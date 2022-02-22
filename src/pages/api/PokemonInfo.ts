import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pokemon } = req.query;

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

  async function getAbilities(abilities) {
    let abilitiesData = [];

    for (let i = 0; i < abilities.length; i++) {
      if (!abilities[i].is_hidden) {
        let descriptionAbilityResponse = await axios.get(
          `${abilities[i].ability.url}`
        );
        let description =
          descriptionAbilityResponse.data.effect_entries[0].effect;

        abilitiesData.push({
          name: abilities[i].ability.name,
          description: description,
        });
      }
    }
    return abilitiesData;
  }

  async function getPokemonInfo() {
    let response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    let data = response.data;
    console.log(data);

    let filteredPokemonData = {
      id: data.id,
      name: data.name,
      num: processNum(data.order),
      image: data.sprites.other.dream_world.front_default,
      characteristics: {
        height: (Number(data.height) * 0.1).toFixed(2),
        weight: (Number(data.weight) * 0.1).toFixed(2),
        abilities: await getAbilities(data.abilities),
        gender: await getGender(data.name),
      },
      types: data.types.map((dataType) => {
        return { name: dataType.type.name };
      }),
      typesOfWeakness: await getTypeWeakness(data.types),
    };

    return filteredPokemonData;
  }

  let pokemonData = await getPokemonInfo();

  res.send(pokemonData);
}
