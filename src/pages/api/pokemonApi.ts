import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    console.log(req.body);
    // axios.get(`https://pokeapi.co/api/v2/pokemon/${}/`)
    res.send("");
  }
}
