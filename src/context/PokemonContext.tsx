import axios from "axios";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type PokemonContextProviderProps = {
  children: ReactNode;
};

type typesProps = {
  name: string;
  url: string;
};

type AllPokemons = {
  id: number;
  name: string;
  sprite: string;
  types: typesProps[];
};

type PokemonContextProps = {
  getAllPokemons: () => Promise<void>;
  loadOnePokemon: (data: number | string) => Promise<void>;
  allPokemons: AllPokemons[];
};

export const PokemonContext = createContext({} as PokemonContextProps);

export default function PokemonContextProvider({
  children,
}: PokemonContextProviderProps) {
  const [allPokemons, setAllPokemons] = useState<AllPokemons[]>([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    if (allPokemons.length <= 1) {
      setAllPokemons([]);
    }
    let postData = { urlLoadMore: loadMore };
    let pokemonsData = await axios.post(`/api/loadPokemons`, postData);

    setLoadMore(pokemonsData.data.nextLoadMoreUrl);
    setAllPokemons((currentList) => [
      ...currentList,
      ...pokemonsData.data.newPokemons,
    ]);
  };

  async function loadOnePokemon(pokemonName: string) {
    try {
      pokemonName = pokemonName.toLowerCase();

      let response = await axios.get(
        `/api/searchPokemon?pokemon=${pokemonName}`
      );

      let data = response.data;

      setAllPokemons([data]);
      setLoadMore("https://pokeapi.co/api/v2/pokemon?limit=20");
    } catch (error) {
      alert("Nome Inválido");
    }
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        getAllPokemons,
        loadOnePokemon,
        allPokemons,
      }}>
      {children}
    </PokemonContext.Provider>
  );
}
