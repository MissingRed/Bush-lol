import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ListItem from '../components/ListItem'
import axios from 'axios'

const Lista = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState('')
	const [error, setError] = useState('')

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
				.then(res => {
					axios
						.get(
							`http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/es_MX/champion.json`
						)
						.then(res => {
							setData(Object.values(res.data.data))
							console.log(Object.values(res.data.data))
						})
				})

			setLoading(false)
		} catch (error) {
			setError(error)
		}
	}

	return (
		<div className="contenedor-princial">
			<Navbar />
			<div className="list-title">
				<h1>Lista de campeones</h1>
				<div className="input-list-container">
					<img className="search-icon" src="/img/search.svg" alt="search" />
					<input placeholder="Buscar campeones" type="text" name="" id="" />
				</div>
			</div>
			<div className="list">
				{data.map(campeon => {
					return (
						<ListItem
							key={campeon.id}
							id={campeon.id}
							name={campeon.name}
							title={campeon.title}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Lista
