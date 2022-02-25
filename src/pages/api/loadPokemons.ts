import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type ArrayOfPokemonsNamesandUrl = {
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let body = req.body;
  let urlRequest: string = body.urlLoadMore;
  const { data } = await axios.get(urlRequest);
  const nextLoadMoreUrl = data.next;
  const arrayOfPokemonsNames: [string] = data.results.map(
    (pokemonNameAndUrl) => pokemonNameAndUrl.name
  );

  let newPokemons = [];
  for (const id of arrayOfPokemonsNames) {
    let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`);
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

    newPokemons.push(filteredPokemonData);
  }

  res.send({ newPokemons, nextLoadMoreUrl });
}
