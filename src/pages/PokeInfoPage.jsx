import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "./styles/PokeInfoPage.css";

const PokeInfoPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const [pokemon, getPokemon] = useFetch(url);

  const getPorcentStat = (statValue) =>{
    const maxporcent = 255
    const porcentStat = ((statValue * 100) / maxporcent).toFixed(1)
    return `${porcentStat}%`
  }
  console.log(getPorcentStat)


  useEffect(() => {
    getPokemon();
  }, []);

  return (
   <article>
   <header className="pokeinfo_header">
        <div className="headerinfo_red">
          <img className="pokeinfo_image" src="/pokedex.svg" alt="pokedex" />
        </div>
        <div className="headerinfo_black">
          <img className="headerinfo_circle" src="/circle.svg" alt="circle" />
        </div>
  </header>
<div className="contenedor">


      <section className="pokeinfo_card">
        <div className="pokeinfo_header-card">
          <img
            className="pokeinfo_image-card"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>

        <section className="pokeinfo_card-body">
          <div className="pokeinfo_card-id">
            <h3 className="pokeinfo_card-number">#{pokemon?.id}</h3>
          </div>
          <h2 className="pokeinfo_card-name">{pokemon?.name}</h2>
          </section>

            <h3 className="pokeinfo_stats">stats</h3>
            <ul className="pokeinfo_li">
              {pokemon?.stats.map((stat) => (
                <li className="pokeinfo_stat-li" key={stat.stat.name}>
                  <div className="pokeinfo_stat">
                    <h4>{stat.stat.name}</h4><span></span>{stat.base_stat}/255
                  </div>
                  <div className="pokeinfo_stat-barra">
                  
                  <div className={`progreso ${getPorcentStat(stat.base_stat)}`}></div>

                  </div>
                
                </li>
              ))}
            </ul>
         
        </section>
        </div>
    </article>
  );
};

export default PokeInfoPage;
