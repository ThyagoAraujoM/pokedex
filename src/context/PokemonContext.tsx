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

    let pokemonNamesAndUrl = await axios.post(`/api/loadPokemonsNames`, {
      urlLoadMore: loadMore,
    });

    const { data } = await axios.get(loadMore);
    const nextLoadMoreUrl = data.next;
    const arrayOfPokemonsNames: [string] = data.results.map(
      (pokemonNameAndUrl) => pokemonNameAndUrl.name
    );

    let newPokemons = [];
    for (const name of arrayOfPokemonsNames) {
      let { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
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

      setAllPokemons((currentList) => [...currentList, filteredPokemonData]);
      // newPokemons.push(filteredPokemonData);
    }
    newPokemons.sort((a, b) => a.id - b.id);

    setLoadMore(nextLoadMoreUrl);
    // setAllPokemons((currentList) => [...currentList, ...newPokemons]);
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
