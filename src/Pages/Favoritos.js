import React, { useEffect, useState } from 'react'
import LoginMensaje from '../components/LoginMensaje'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Loading from '../components/Loading'
import Error from '../components/Error'
import ListItem from '../components/ListItem'

const Favoritos = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [data, setData] = useState([])
	const [listaFavoritos, setListaFavoritos] = useState('')
	const [loading, setLoading] = useState('')
	const [error, setError] = useState('')
	const [textoBusqueda, setTextoBusqueda] = useState('')
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		if (localStorage.usertoken) {
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			setName(decoded.username)
			setEmail(decoded.email)
			TraerFavoritos(decoded.email)
		}
		return () => {}
	}, [])

	const TraerFavoritos = async (email) => {
		setLoading(true)
		setError(null)
		try {
			await axios
				.get(`users/favoritos/${email}`)
				.then((res) => {
					const datos = res.data.favoritos
					setListaFavoritos(datos)
					fetchData(datos)
				})
				.catch((err) => {
					setError(err)
				})

			setLoading(false)
		} catch (error) {
			setError(error)
		}
	}

	const handleChange = (e) => {
		const texto = e.target.value
		setTextoBusqueda(texto)

		const search = data.filter((campeon) => {
			return `${campeon.name}`.toLowerCase().includes(texto.toLowerCase())
		})

		setSearchResult(search)
	}

	const fetchData = async (datos) => {
		setLoading(true)
		setError(null)
		try {
			await axios
				.get('https://ddragon.leagueoflegends.com/api/versions.json')
				.then((res) => {
					axios
						.get(
							`http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/es_MX/champion.json`
						)
						.then((res) => {
							const array = Object.values(res.data.data)
							let ArrayTemporal = []
							array.map((campeon) => {
								if (datos.includes(campeon.id)) {
									ArrayTemporal.push(campeon)
								}
							})
							setData(ArrayTemporal)
						})
						.catch((err) => {
							setError(err)
						})
				})

			setLoading(false)
		} catch (error) {
			setError(error)
		}
	}

	if (!localStorage.usertoken) {
		return (
			<div className="contenedor-princial">
				<LoginMensaje title="Campeones Favoritos" />
			</div>
		)
	}

	if (loading) {
		return (
			<div className="contenedor-princial">
				<div className="list-title">
					<div className="perfil-favoritos">
						<img
							className="foto-perfil-favoritos"
							src="img/foto-perfil.png"
							alt=""
						/>
						<div>
							<h1>{name}</h1>
							<span>
								{listaFavoritos.length === 1
									? `${listaFavoritos.length} campeon favorito`
									: `${listaFavoritos.length} campeones favoritos`}
							</span>
						</div>
					</div>
					<div className="input-list-container">
						<img className="search-icon" src="/img/search.svg" alt="search" />
						<input
							placeholder="Buscar campeones"
							onChange={handleChange}
							type="text"
						/>
					</div>
				</div>
				<div className="list">
					<div className="title-favorites">
						<h1>Favoritos</h1>
					</div>
					<Loading />
				</div>
			</div>
		)
	}
	if (error) {
		return (
			<div className="contenedor-princial">
				<div className="list-title">
					<div className="perfil-favoritos">
						<img
							className="foto-perfil-favoritos"
							src="img/foto-perfil.png"
							alt=""
						/>
						<div>
							<h1>{name}</h1>
							<span>
								{listaFavoritos.length === 1
									? `${listaFavoritos.length} campeon favorito`
									: `${listaFavoritos.length} campeones favoritos`}
							</span>
						</div>
					</div>
					<div className="input-list-container">
						<img className="search-icon" src="/img/search.svg" alt="search" />
						<input
							placeholder="Buscar campeones"
							onChange={handleChange}
							type="text"
						/>
					</div>
				</div>
				<div className="list">
					<div className="title-favorites">
						<h1>Favoritos</h1>
					</div>
					<Error />
				</div>
			</div>
		)
	}

	if (!textoBusqueda) {
		return (
			<div className="contenedor-princial">
				<div className="list-title">
					<div className="perfil-favoritos">
						<img
							className="foto-perfil-favoritos"
							src="img/foto-perfil.png"
							alt=""
						/>
						<div>
							<h1>{name}</h1>
							<span>
								{listaFavoritos.length === 1
									? `${listaFavoritos.length} campeon favorito`
									: `${listaFavoritos.length} campeones favoritos`}
							</span>
						</div>
					</div>
					<div className="input-list-container">
						<img className="search-icon" src="/img/search.svg" alt="search" />
						<input
							placeholder="Buscar campeones"
							onChange={handleChange}
							type="text"
						/>
					</div>
				</div>
				<div className="list">
					<div className="title-favorites">
						<h1>Favoritos</h1>
					</div>
					{data.map((campeon) => {
						return (
							<ListItem
								key={campeon.id}
								id={campeon.id}
								name={campeon.name}
								title={campeon.title}
								EsFavorito={true}
								email={email}
							/>
						)
					})}
				</div>
			</div>
		)
	}
	if (!searchResult.length) {
		return (
			<div className="contenedor-princial">
				<div className="list-title">
					<div className="perfil-favoritos">
						<img
							className="foto-perfil-favoritos"
							src="img/foto-perfil.png"
							alt=""
						/>
						<div>
							<h1>{name}</h1>
							<span>
								{listaFavoritos.length === 1
									? `${listaFavoritos.length} campeon favorito`
									: `${listaFavoritos.length} campeones favoritos`}
							</span>
						</div>
					</div>
					<div className="input-list-container">
						<img className="search-icon" src="/img/search.svg" alt="search" />
						<input
							placeholder="Buscar campeones"
							onChange={handleChange}
							type="text"
						/>
					</div>
				</div>
				<div className="list">
					<div className="title-favorites">
						<h1>Favoritos</h1>
					</div>
					<div className="container-error">
						<span>{`No se encontró el campeón: ${textoBusqueda}`}</span>
					</div>
				</div>
			</div>
		)
	}
	return (
		<div className="contenedor-princial">
			<div className="list-title">
				<div className="perfil-favoritos">
					<img
						className="foto-perfil-favoritos"
						src="img/foto-perfil.png"
						alt=""
					/>
					<div>
						<h1>{name}</h1>
						<span>
							{listaFavoritos.length === 1
								? `${listaFavoritos.length} campeon favorito`
								: `${listaFavoritos.length} campeones favoritos`}
						</span>
					</div>
				</div>
				<div className="input-list-container">
					<img className="search-icon" src="/img/search.svg" alt="search" />
					<input
						placeholder="Buscar campeones"
						onChange={handleChange}
						type="text"
					/>
				</div>
			</div>
			<div className="list">
				<div className="title-favorites">
					<h1>Favoritos</h1>
				</div>
				{searchResult.map((campeon) => {
					return (
						<ListItem
							key={campeon.id}
							id={campeon.id}
							name={campeon.name}
							title={campeon.title}
							EsFavorito={true}
							email={email}
							pageFavoritos={true}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Favoritos
