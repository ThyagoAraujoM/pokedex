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

type AllPokemons = {
  id: string;
  name: string;
  sprite: string;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
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
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    if (allPokemons.length <= 1) {
      setAllPokemons([]);
    }
    let postData = { loadMoreUrl: loadMore };
    let pokemonUrlData = await axios.post(`/api/loadPokemonsUrl`, postData);
    let pokemonsUrl = pokemonUrlData.data.arrayOfPokemonsUrl;
    setLoadMore(pokemonUrlData.data.nextLoadMoreUrl);
    let newPokemons = await axios.post(`/api/loadPokemonsData`, pokemonsUrl);
    console.log(newPokemons.data);
    // const { data } = await axios.get(loadMore);
    // setLoadMore(data.next);

    // async function createPokemonObject(results) {
    //   results.forEach(async (pokemon) => {
    //     const newPokemonRespose = await axios.get<AllPokemons>(
    //       `/api/searchPokemon?pokemon=${pokemon.name}`
    //     );

    //     let newPokemonData = newPokemonRespose.data;

    //     setAllPokemons((currentList) => [...currentList, newPokemonData]);
    //     // allPokemons.sort((a, b) => a.id - b.id);
    //   });
    // }

    // createPokemonObject(data.results);
  };

  async function loadOnePokemon(pokemonId: string) {
    try {
      pokemonId = pokemonId.toLowerCase();

      let response = await axios.get(`/api/searchPokemon?pokemon=${pokemonId}`);

      let data = response.data;

      setAllPokemons(data);
      setLoadMore("https://pokeapi.co/api/v2/pokemon?limit=20");
    } catch (error) {
      alert("Nome Inválido");
    }
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  // modificar
  useEffect(() => {
    allPokemons.sort((a, b) => a.id - b.id);
  }, [allPokemons]);

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
