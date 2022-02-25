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
  id: string;
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
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    if (allPokemons.length <= 1) {
      setAllPokemons([]);
    }
    let postData = { urlLoadMore: loadMore };
    let pokemonsData = await axios.post(`/api/loadPokemons`, postData);
    setAllPokemons((currentList) => [
      ...currentList,
      pokemonsData.data.newPokemons,
    ]);
    setLoadMore(pokemonsData.data.nextLoadMoreUrl);
    console.log(pokemonsData.data);
    // pokemonsName.forEach(async (pokemonName) => {
    //   let postData = { pokemonName: pokemonName };
    //   const { data } = await axios.post(`/api/loadPokemonsData`, postData);
    //   let pokemonRequestData = data;
    //   newPokemons.push(pokemonRequestData);
    // });

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
