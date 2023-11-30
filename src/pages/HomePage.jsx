import { useRef } from "react";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css";

const HomePage = () => {
  const inputName = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerName(inputName.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <article className="homepage">
      <section className="homepage_section">
        <div>
          <div>
            <img className="homepage_image" src="/pokedex.svg" alt="pokedex" />
          </div>
          <h2 className="homepage_title">Hi Trainer!</h2>
          <p className="homepage_indication">
            To Start, please give me your trainer name
          </p>
          <form className="homepage_form" onSubmit={handleSubmit}>
            <input className="homepage_input" ref={inputName} type="text" placeholder="your name..." />
            <button className="homepage_btn">Starts!</button>
          </form>
        </div>
      </section>
      <footer className="footer">
        <div className="footer_red">
          <img className="footer_circle" src="/circle.svg" alt="circle" />
        </div>
        <div className="footer_black"></div>
      </footer>
    </article>
  );
};

export default HomePage;
