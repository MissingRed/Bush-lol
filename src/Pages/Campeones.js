import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/campeones.css";
import Navbar from "../components/Navbar";

const Campeones = props => {
  // const id = props.id;
  const [data, setData] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
    acomodarTexto();
    // const item = document.querySelector(`#${id}`);
    // item.getElementsByClassName.backgroundImage = `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0jpg")`;
    return () => {};
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios
        .get("https://ddragon.leagueoflegends.com/api/versions.json")
        .then(res => {
          axios
            .get(
              `http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/es_MX/champion/LeeSin.json`
            )
            .then(res => {
              setData(Object.values(res.data.data)[0]);
              console.log(Object.values(res.data.data)[0]);
            });
        });

      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const acomodarTexto = () => {
    const texto = "vi";
    const minuscula = texto.toLocaleLowerCase();
    const arregloPalabras = minuscula.split(" ");
    let mayuscula = "";

    for (let i = 0; i < arregloPalabras.length; i++) {
      mayuscula +=
        arregloPalabras[i].charAt(0).toUpperCase() +
        arregloPalabras[i].slice(1);
    }

    console.log(mayuscula);
  };

  return (
    <div className="contenedor-princial">
      <Navbar />
      {data ? (
        <div className="wrapper">
          <div className="title">
            <div className="difuminado">
              <div className="contenido">
                <h2>Lee Sin</h2>
                <p>Lorem ipsum dolor sit amet. </p>
              </div>
            </div>
          </div>
          <div className="skills">
            <h2>R: {data.spells[3].name}</h2>

            <p>{data.spells[3].description}</p>
            <div className="imgs">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/passive/${data.passive.image.full}`}
                alt="Pasiva"
              />

              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[0].image.full}`}
                alt="Q"
              />
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[1].image.full}`}
                alt="W"
              />
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[2].image.full}`}
                alt="W"
              />
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[3].image.full}`}
                alt="W"
              />
            </div>
          </div>
          <div className="video">
            <video src="https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0064/ability_0064_R1.webm"></video>
          </div>
        </div>
      ) : (
        <strong>Loading..</strong>
      )}
    </div>
  );
};

export default Campeones;
