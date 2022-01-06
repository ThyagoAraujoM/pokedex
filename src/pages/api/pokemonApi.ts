import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`);
  console.log(response);
  res.json(response.data);
}
