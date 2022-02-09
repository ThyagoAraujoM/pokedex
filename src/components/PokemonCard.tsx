import React from "react";
import styles from "../styles/pokemon.module.scss";

type abilityProps = {
  name: string;
  description: string;
};

type PokemonCardProps = {
  pokemonData: {
    name: string;
    num: (num: string) => string;
    image: string;
    characteristics: {
      height: number;
      weight: number;
      abilities: abilityProps[];
      gender: string;
    };
    types: [{ name: string }];
    typesOfWeakness: string[];
  };
};

export function PokemonCard({ pokemonData }: PokemonCardProps) {
  function showMoreAboutAbility(name: string) {}

  return (
    <div className={styles.pokemonInfoContainer}>
      <img className={styles.pokemonImage} src={pokemonData.image} alt='' />
      <div className={styles.pokemonInfoTable}>
        <p>
          Height <span>{pokemonData.characteristics.height} m</span>
        </p>
        <p>
          Weight <span>{pokemonData.characteristics.weight} kg</span>
        </p>
        <p>
          Gender: <span> {pokemonData.characteristics.gender}</span>
        </p>
        <p className={styles.abilitiesContainer}>
          Abilities:
          {pokemonData.characteristics.abilities.map((value, index) => {
            return (
              <span key={index}>
                {value.name}
                <button
                  className={styles.showMoreAboutAbilityButton}
                  onClick={() => {
                    showMoreAboutAbility(value.name);
                  }}>
                  ?
                </button>
              </span>
            );
          })}
        </p>
        {pokemonData.characteristics.abilities.map((value, index) => {
          return (
            <div
              key={index}
              className={styles.abilityDescriptionContainer}
              id={value.name}>
              <header>
                <p>Ability info</p>
                <button>X Close</button>
              </header>
              <div className={styles.abilityDescription}>
                <h4>{value.name}</h4>
                <p>{value.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.pokemonTypeContainer}>
        <div>
          <h3>Type</h3>
          {pokemonData.types.map((type, index) => {
            return <p key={index}>{type.name}</p>;
          })}
        </div>
        <div>
          <h3>Weaknesses</h3>
        </div>
      </div>
    </div>
  );
}
