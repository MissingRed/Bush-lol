
import React, { useEffect } from "react";
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ListItem = (props) => {
	const id = props.id
	const EstrellaAmarilla = '/img/bxs-star.svg'
	const EstrellaBlanca = '/img/bx-star.svg'
	const EsFavorito = props.EsFavorito
	const user = localStorage.usertoken
	const [estrella, setEstrella] = useState(
		EsFavorito ? EstrellaAmarilla : EstrellaBlanca
	)


  useEffect(() => {
    const item = document.querySelector(`#${id}`);
    item.style.backgroundImage = `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg")`;
  }, []);

  return (
    <div id={`${id}`} className="list-item">
      <div className="info-item">
        <h2>{props.name}</h2>
        <p>{props.title}</p>
      </div>
      <img src="/img/star.svg" alt="" />
      <div className="color-item"></div>
    </div>
  );
};

	const toggleStar = async () => {
		if (estrella === EstrellaAmarilla) {
			setEstrella(EstrellaBlanca)
			await axios.put('users/favoritos/', {
				email: props.email,
				eliminar: id,
			})
		} else {
			setEstrella(EstrellaAmarilla)
			await axios.post('users/favoritos/', {
				email: props.email,
				nuevo: id,
			})
		}
	}

	return (
		<motion.div whileHover={{ scale: 1.1 }} className="item-container">
			<Link to={`/champions/${id}`}>
				<div id={id} className="list-item">
					<div className="info-item">
						<h2>{props.name}</h2>
						<p>{props.title}</p>
					</div>
					<div className="color-item"></div>
				</div>
			</Link>
			{user ? (
				<img
					onClick={() => toggleStar()}
					className="start-item"
					src={estrella}
					alt=""
				/>
			) : null}
		</motion.div>
	)
}


export default ListItem;
