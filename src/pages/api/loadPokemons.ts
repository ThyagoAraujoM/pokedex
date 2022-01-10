import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${req.query.limit}&offset${req.query.offset}`
  );
  res.send(response.data.results);
}
