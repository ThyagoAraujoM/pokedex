/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../styles/home.module.scss";
import { lighten, modularScale, opacify } from "polished";

type typeProps = {
  type: {
    name;
  };
};

type PokemonListProps = {
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
  types: typeProps[];
};

export function PokemonLisItem({ name, sprites, types }: PokemonListProps) {
  const background: React.CSSProperties = {
    background: `var(--${types[0].type.name})`,
  };

  return (
    <li className={styles.pokemonCard}>
      <div className={styles.pokemonImgContainer}>
        <div style={background} className={styles.imgBackground}></div>
        <img src={sprites.other.officialArtwork.front_default} alt={name} />
      </div>
      <div className={styles.pokemonInfoContainer}>
        <p className={styles.pokemonName}>{name}</p>
        <div className={styles.typesContainer}>
          {types.map((type, index) => {
            const background: React.CSSProperties = {
              background: `var(--${type.type.name})`,
            };
            return (
              <p key={index} className={`${styles.type}`} style={background}>
                {type.type.name}
              </p>
            );
          })}
        </div>
      </div>
    </li>
  );
}
