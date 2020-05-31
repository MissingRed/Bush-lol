import React from "react";
import Navbar from "../components/Navbar";
import ItemsComponent from "../components/ItemsComponent";
import LoginMensaje from '../components/LoginMensaje'

const Builds = () => {
  if (!localStorage.usertoken) {
		return (
			<div className="contenedor-princial">
				<LoginMensaje title="Builds" />
			</div>
		)
	}
	return (
		<div className="contenedor-princial">
			{/* <Navbar /> */}
      <div className="cabecera">
        <h1>Builds</h1>
        <input type="search" name="Buscar" placeholder="Buscar Campeones" />
      </div>
      <hr />
      <div className="agregar">
        <a href="">
          <div className="addBuild-btn">
            Agregar nueva Build
            <img src="/img/plus-circle.svg" alt="" />
          </div>
        </a>
      </div>
      <div className="grid">
        <ItemsComponent></ItemsComponent>
        <ItemsComponent></ItemsComponent>
        <ItemsComponent></ItemsComponent>
      </div>
		</div>
	)
};

export default Builds;
