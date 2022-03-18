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

  res.send({ arrayOfPokemonsNames, nextLoadMoreUrl });
}
