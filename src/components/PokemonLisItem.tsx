/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../styles/home.module.scss";
import { lighten, modularScale, opacify } from "polished";
import Link from "next/link";

type typeProps = {
  type: {
    name: string;
  };
};

type PokemonListProps = {
  name: string;
  sprite: string;
  types: typeProps[];
};

export function PokemonLisItem({ name, sprite, types }: PokemonListProps) {
  const background: React.CSSProperties = {
    background: `var(--${types[0].type.name})`,
  };

  return (
    <li className={styles.pokemonCard}>
      <Link href={`/pokemon/${name}`} passHref>
        <div className={styles.pokemonImgContainer}>
          <div style={background} className={styles.colorBackground}></div>
          <img src={sprite} alt={name} />
        </div>
      </Link>
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
