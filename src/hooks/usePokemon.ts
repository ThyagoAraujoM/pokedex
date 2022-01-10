import React, { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

export default function usePokemon() {
  const value = useContext(PokemonContext);
  return value;
}
