import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${req.query.pokemon}`
  );
  let pokemonRequestData = data;

  let filteredPokemonData = {
    id: pokemonRequestData.id,
    name: pokemonRequestData.name,
    sprite: pokemonRequestData.sprites.other["official-artwork"].front_default,
    types: pokemonRequestData.types.map((typeContainer) => typeContainer.type),
  };

  res.send(filteredPokemonData);
}
