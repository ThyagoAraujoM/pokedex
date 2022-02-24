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
  let urlRequest: string = body.loadMoreUrl;
  const { data } = await axios.get(urlRequest);
  const nextLoadMoreUrl = data.next;
  const arrayOfPokemonsUrl: [string] = data.results.map(
    (pokemonNameAndUrl) => pokemonNameAndUrl.url
  );

  res.send({ nextLoadMoreUrl, arrayOfPokemonsUrl });
}
