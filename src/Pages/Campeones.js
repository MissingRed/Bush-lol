import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/campeones.css'
import Navbar from '../components/Navbar'

const Campeones = props => {
	const idCampeon = props.match.params.campeon
	const [data, setData] = useState('')
	const [loading, setLoading] = useState('')
	const [error, setError] = useState('')
	const [habilidadActual, setHabilidadActual] = useState('')

	useEffect(() => {
		fetchData()
		//acomodarTexto()
		return () => {}
	}, [])

	const fetchData = async () => {
		setLoading(true)
		setError(null)
		try {
			await axios
				.get('https://ddragon.leagueoflegends.com/api/versions.json')
				.then(res => {
					axios
						.get(
							`http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/es_MX/champion/${idCampeon}.json`
						)
						.then(res => {
							setData(Object.values(res.data.data)[0])
							console.log(Object.values(res.data.data)[0])
							const item = document.querySelector(`#${idCampeon}`).children[1]
								.children[0]
							item.style.backgroundImage = `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${idCampeon}_0.jpg")`
							console.log(Object.values(res.data.data)[0].passive.name)
							setHabilidadActual([
								'P',
								Object.values(res.data.data)[0].passive.name,
								Object.values(res.data.data)[0].passive.description
							])
						})
				})

			setLoading(false)
		} catch (error) {
			setError(error)
		}
	}

	const acomodarTexto = () => {
		const texto = 'vi'
		const minuscula = texto.toLocaleLowerCase()
		const arregloPalabras = minuscula.split(' ')
		let mayuscula = ''

		for (let i = 0; i < arregloPalabras.length; i++) {
			mayuscula +=
				arregloPalabras[i].charAt(0).toUpperCase() + arregloPalabras[i].slice(1)
		}

		console.log(mayuscula)
	}

	const cambiarHabilidad = (key, hab) => {
		if (hab === 4) {
			setHabilidadActual([key, data.passive.name, data.passive.description])
		} else {
			setHabilidadActual([
				key,
				data.spells[hab].name,
				data.spells[hab].description
			])
		}
	}

	return (
		<div id={`${idCampeon}`} className="contenedor-princial">
			<Navbar />
			{data ? (
				<div className="wrapper">
					<div className="title">
						<div className="difuminado">
							<div className="contenido">
								<h2>{data.name}</h2>
								<p>{data.title}</p>
							</div>
						</div>
					</div>
					<div className="skills">
						<h2>{`${habilidadActual[0]}: ${habilidadActual[1]}`}</h2>

						<p>{habilidadActual[2]}</p>
						<div className="imgs">
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/passive/${data.passive.image.full}`}
								alt="Pasiva"
								onClick={() => {
									cambiarHabilidad('P', 4)
								}}
							/>

							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[0].image.full}`}
								alt="Q"
								onClick={() => {
									cambiarHabilidad('Q', 0)
								}}
							/>
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[1].image.full}`}
								alt="W"
								onClick={() => {
									cambiarHabilidad('W', 1)
								}}
							/>
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[2].image.full}`}
								alt="E"
								onClick={() => {
									cambiarHabilidad('E', 2)
								}}
							/>
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[3].image.full}`}
								alt="R"
								onClick={() => {
									cambiarHabilidad('R', 3)
								}}
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
	)
}

export default Campeones
