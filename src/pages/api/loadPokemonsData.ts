import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pokemonsUrl = req.body;

  let newPokemonsData = [];
  pokemonsUrl.forEach(async (pokemonUrl) => {
    const { data } = await axios.get(pokemonUrl);
    let pokemonRequestData = data;

    let filteredPokemonData = {
      id: pokemonRequestData.id,
      name: pokemonRequestData.name,
      sprite:
        pokemonRequestData.sprites.other["official-artwork"].front_default,
      types: pokemonRequestData.types.map(
        (typeContainer) => typeContainer.type
      ),
    };
    newPokemonsData.push(filteredPokemonData);
  });
  newPokemonsData.sort((a, b) => a.id - b.id);

  res.send(newPokemonsData);
}
