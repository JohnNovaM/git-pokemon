import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./styles/PokeCard.css";

const PokeCard = ({ url }) => {
  const [infoPoke, getInfoPoke] = useFetch(url);

  useEffect(() => {
    getInfoPoke();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/pokedex/${infoPoke?.id}`);
  };

  const firsType = infoPoke?.types[0].type.name;

  return (
    <article className={`pokecard ${firsType}-border`} onClick={handleNavigate}>
      <header className={`pokecard_header ${firsType}-gradient`}>
        <img
          className="pokecard_imge"
          src={infoPoke?.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </header>
      <section className="pokecard_body">
        <h3 className={`pokecard_name ${firsType}-color`}>{infoPoke?.name}</h3>
        <ul className="pokecard_types">
          {infoPoke?.types.map((infoType) => (
            <li className="pokecard_typename" key={infoType.type.url}>
              {infoType.type.name}
            </li>
          ))}
        </ul>
        <hr className="pokecard_hr" />
        <ul className="pokecard_stats">
          {infoPoke?.stats.map((infoStat) => (
            <li className="pokecard_stat" key={infoStat.stat.url}>
              <h4 className="pokecard_stat-name">{infoStat.stat.name}</h4>
              <span className={`pokecard_stat-value ${firsType}-color`}>
                {infoStat.base_stat}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default PokeCard;
