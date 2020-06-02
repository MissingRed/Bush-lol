import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BarraBusqueda = ({ close }) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState('')
	const [error, setError] = useState('')
	const [textoBusqueda, setTextoBusqueda] = useState('')
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		fetchData()
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
							console.log(Object.values(res.data.data))
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

	return (
		<div>
			<div className="back-busqueda-modal" onClick={() => close()}></div>
			<input
				placeholder="Buscar campeones"
				className="barra-busqueda"
				type="text"
				onChange={handleChange}
			/>
			{searchResult.length && textoBusqueda ? (
				<div className="sugerencias">
					{searchResult.length && textoBusqueda ? (
						<div>
							{searchResult.map((campeon, index) => {
								return (
									<Link to={`/champions/${campeon.id}`} onClick={() => close()}>
										<div key={index} className="item-busqueda-modal">
											<img
												src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/${campeon.id}.png`}
												alt=""
											/>
											<span>{campeon.name}</span>
										</div>
									</Link>
								)
							})}
						</div>
					) : null}
				</div>
			) : null}
		</div>
	)
}

export default BarraBusqueda
