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
      gender: string[];
    };
    types: [{ name: string }];
    typesOfWeakness: string[];
  };
};

export function PokemonCard({ pokemonData }: PokemonCardProps) {
  function showMoreAboutAbility(name: string) {
    document.querySelector<HTMLElement>(`#js-${name}`).style.display = "flex";
  }
  function closeAbilityDescription(name: string) {
    document.querySelector<HTMLElement>(`#js-${name}`).style.display = "none";
  }
  let genderImg = () => {
    let imgHtml = "";

    return imgHtml;
  };
  return (
    <div className={styles.pokemonInfoContainer}>
      <img className={styles.pokemonImage} src={pokemonData.image} alt='' />
      <div className={styles.pokemonInfoTable}>
        <p>
          Height <span>{pokemonData.characteristics.height.toFixed(2)} m</span>
        </p>
        <p>
          Weight <span>{pokemonData.characteristics.weight.toFixed(2)} kg</span>
        </p>
        <p>
          Gender:{" "}
          <div>
            {pokemonData.characteristics.gender.map((gender, index) => {
              if (gender === "male") {
                return <img key={index} src='/assets/maleIcon.svg' />;
              }
              if (gender === "fem") {
                return <img key={index} src='/assets/feminineIcon.svg' />;
              }
              if (gender === "genderless") {
                return <p>Genderless</p>;
              }
            })}
          </div>
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
              id={`js-${value.name}`}>
              <header>
                <p>Ability info</p>
                <button
                  onClick={() => {
                    closeAbilityDescription(value.name);
                  }}>
                  X Close
                </button>
              </header>
              <div className={styles.abilityDescription}>
                <h3 className={styles.abilityTitle}>{value.name}</h3>
                <p>{value.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.pokemonType_Weakness_Container}>
        <div className={styles.pokemonTypes}>
          <h3>Type</h3>
          <div className={styles.itemsContainer}>
            {pokemonData.types.map((type, index) => {
              const background: React.CSSProperties = {
                background: `var(--${type.name})`,
              };
              return (
                <p key={index} style={background}>
                  {type.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className={styles.pokemonWeakness}>
          <h3>Weaknesses</h3>
          <div className={styles.itemsContainer}>
            {pokemonData.typesOfWeakness.map((weakness, index) => {
              const background: React.CSSProperties = {
                background: `var(--${weakness})`,
              };
              return (
                <p key={index} style={background}>
                  {weakness}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
