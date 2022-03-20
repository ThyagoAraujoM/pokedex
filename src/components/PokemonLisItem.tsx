/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../styles/home.module.scss";
import { lighten, modularScale, opacify } from "polished";
import Link from "next/link";

type typeProps = {
  name: string;
  url: string;
};

type PokemonListProps = {
  name: string;
  sprite: string;
  types: typeProps[];
  animationValue: number;
};

export function PokemonLisItem({
  name,
  sprite,
  types,
  animationValue,
}: PokemonListProps) {
  const background: React.CSSProperties = {
    background: `var(--${types[0].name})`,
  };
  let animationClass = "";
  switch (animationValue) {
    case 0:
      animationClass = "topDropDown";
      break;
    case 1:
      animationClass = "rightDropDown";
      break;
    case 2:
      animationClass = "bottomDropDown";
      break;
    case 3:
      animationClass = "leftDropDown";
      break;
  }
  console.log(animationValue);

  return (
    <li className={`${styles.pokemonCard} ${styles[animationClass]} `}>
      <Link href={`/pokemon/${name}`} passHref>
        <div className={styles.pokemonImgContainer}>
          <div style={background} className={styles.colorBackground}></div>
          <div className={styles.colorBackground}></div>
          <img src={sprite} alt={name} />
        </div>
      </Link>
      <div className={styles.pokemonInfoContainer}>
        <p className={styles.pokemonName}>{name}</p>
        <div className={styles.typesContainer}>
          {types.map((type, index) => {
            const background: React.CSSProperties = {
              background: `var(--${type.name})`,
            };
            return (
              <p key={index} className={`${styles.type}`} style={background}>
                {type.name}
              </p>
            );
          })}
        </div>
      </div>
    </li>
  );
}
