import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import "./styles/PokedexPage.css";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");

  const trainerName = useSelector((store) => store.trainerName);

  const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  const [pokemons, getPokemons, getByTypePokemons] = useFetch(url);

  useEffect(() => {
    if (selectValue === "allPokemons") {
      getPokemons();
    } else {
      getByTypePokemons(selectValue);
    }
  }, [selectValue]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.toLowerCase().trim());
    inputSearch.current.value = "";
  };

  const cbFilter = (poke) => {
    //Filtro por nombre en el input
    const nameFiltered = poke.name.includes(inputValue);
    return nameFiltered;
  };

  console.log(pokemons);

  return (
    <article>
      <header className="pokedexpage_header">
        <div className="header_red">
          <img className="pokedexpage_image" src="/pokedex.svg" alt="pokedex" />
        </div>
        <div className="header_black">
          <img className="header_circle" src="/circle.svg" alt="circle" />
        </div>
      </header>

      <section className="pokedexpage_body">
        <div className="pokedexpage_salute">
          Welcome <span>{trainerName}, </span>
          <span className="pokedexpage_salute-comp">
            Here you can find your favorite pokemon. Let's go!
          </span>
        </div>
      </section>

      <section className="pokedex_sectionform">
        <form className="pokedexpage_form" onSubmit={handleSubmit}>
          <input className="pokedexpage_input" ref={inputSearch} type="text" />
          <button className="pokedexpage_btn">search</button>
        </form>
        <SelectType setSelectValue={setSelectValue} />
      </section>
      
      <div className="pokedexpage_container">
        {pokemons?.results.filter(cbFilter).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
    </article>
  );
};

export default PokedexPage;
