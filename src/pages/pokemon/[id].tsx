import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/pokemon.module.scss";

export default function Pokemon() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    async function getPokemon() {
      let response = await axios.get(`/api/searchPokemon?pokemon=${id}`);
      let data = response.data;

      let filteredPokemon = {
        name: data.name,
      };
    }
    if (id) {
      getPokemon();
    }
  }, [id]);

  return (
    <>
      <header className={styles.header}>
        <button className={styles["header-button"]}>
          <img src='' alt='' />
          N°001 Bulbasaur
        </button>
        <button className={styles["header-button"]}>
          Venusaur N°003
          <img src='' alt='' />
        </button>
        <h2>Ivysaur N°002</h2>
      </header>
      <main>
        <img src='' alt='' />
        <div>
          <p>
            When the bulb on its back grows large, it appears to lose the
            ability to stand on its hind legs.
          </p>
          <div>
            <p>Versions:</p>
            <button>Blue ball</button>
            <button>Red ball</button>
          </div>
        </div>
        <div>
          <p>
            Height <span>1.0m</span>{" "}
          </p>
          <p>
            Category <span>Seed</span>{" "}
          </p>
          <p>
            Weight <span>13.0kg</span>{" "}
          </p>
          <p>
            Abilities <span>Overgrow</span>{" "}
          </p>
          <p>
            Gender <span>M F</span>{" "}
          </p>
        </div>
        <div>
          <div>
            <h3>Type</h3>
            <p>Grass</p>
            <p>Poison</p>
          </div>
          <div>
            <h3>Weaknesses</h3>
            <p>Fire</p>
            <p>Psychic</p>
          </div>
        </div>
        <div>
          <h2>Evoluções</h2>
          <div>
            <img src='' alt='' />
            <p>
              Bulbasaur <span> Nº 001</span>
            </p>
            <div>
              <p>Grass</p>
              <p>Poison</p>
            </div>
          </div>
          <div>
            <img src='' alt='' />
            <p>
              Bulbasaur <span> Nº 001</span>
            </p>
            <div>
              <p>Grass</p>
              <p>Poison</p>
            </div>
          </div>
          <div>
            <img src='' alt='' />
            <p>
              Bulbasaur <span> Nº 001</span>
            </p>
            <div>
              <p>Grass</p>
              <p>Poison</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
