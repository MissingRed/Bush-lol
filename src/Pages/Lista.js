import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ListItem from '../components/ListItem'
import Loading from '../components/Loading'
import Error from '../components/Error'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Lista = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState('')
	const [error, setError] = useState('')
	const [textoBusqueda, setTextoBusqueda] = useState('')
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		fetchData()
		return () => {}
	}, [])

	const fetchData = async () => {
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
							setData(Object.values(res.data.data))
							// console.log(Object.values(res.data.data))
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

	const handleChange = (e) => {
		const texto = e.target.value
		setTextoBusqueda(texto)

		const search = data.filter((campeon) => {
			return `${campeon.name}`.toLowerCase().includes(texto.toLowerCase())
		})

		setSearchResult(search)
	}

	if (loading) {
		return (
			<div className="contenedor-princial">
				<Navbar />
				<div className="list-title">
					<h1>Lista de campeones</h1>
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
					<Loading />
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="contenedor-princial">
				<Navbar />
				<div className="list-title">
					<h1>Lista de campeones</h1>
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
					<Error />
				</div>
			</div>
		)
	}

	if (!textoBusqueda) {
		return (
			<div className="contenedor-princial">
				<Navbar />
				<div className="list-title">
					<h1>Lista de campeones</h1>
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
					{data.map((campeon) => {
						return (
							<Link key={campeon.id} to={`/champions/${campeon.id}`}>
								<ListItem
									key={campeon.id}
									id={campeon.id}
									name={campeon.name}
									title={campeon.title}
								/>
							</Link>
						)
					})}
				</div>
			</div>
		)
	}
	if (!searchResult.length) {
		return (
			<div className="contenedor-princial">
				<Navbar />
				<div className="list-title">
					<h1>Lista de campeones</h1>
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
					<div className="container-error">
						<span>{`No se encontró el campeón: ${textoBusqueda}`}</span>
					</div>
				</div>
			</div>
		)
	}
	return (
		<div className="contenedor-princial">
			<Navbar />
			<div className="list-title">
				<h1>Lista de campeones</h1>
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
				{searchResult.map((campeon) => {
					return (
						<Link key={campeon.id} to={`/champions/${campeon.id}`}>
							<ListItem
								key={campeon.id}
								id={campeon.id}
								name={campeon.name}
								title={campeon.title}
							/>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default Lista
