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
  name: string;
  sprites: {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: {
      dream_world: { front_default: string; front_female: string };
      home: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
      officialArtwork?: { front_default: string };
    };
  };
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
  const [selectPokemon, setSelectPokemon] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const getAllPokemons = async () => {
    if (allPokemons.length <= 1) {
      setAllPokemons([]);
    }
    const res = await axios.get(loadMore);
    const data = res.data;

    setLoadMore(data.next);

    async function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = res.data;
        setAllPokemons((currentList) => [
          ...currentList,
          {
            ...data,
            sprites: {
              ...data.sprites,
              other: {
                ...data.sprites.other,
                officialArtwork: data.sprites.other["official-artwork"],
              },
            },
          },
        ]);
        allPokemons.sort((a, b) => a.id - b.id);
      });
    }

    createPokemonObject(data.results);
  };

  async function loadOnePokemon(pokemonId: string) {
    try {
      pokemonId = pokemonId.toLowerCase();

      let response = await axios.get(`/api/searchPokemon?pokemon=${pokemonId}`);
      let data = response.data;
      setAllPokemons([
        {
          ...data,
          sprites: {
            ...data.sprites,
            other: {
              ...data.sprites.other,
              officialArtwork: data.sprites.other["official-artwork"],
            },
          },
        },
      ]);
      setLoadMore("https://pokeapi.co/api/v2/pokemon?limit=20");
    } catch (error) {
      alert("Nome Inválido");
    }
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

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
