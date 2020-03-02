import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
	const [data, setData] = useState('')
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
							`http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/es_MX/champion/LeeSin.json`
						)
						.then(res => {
							setData(Object.values(res.data.data)[0])
							console.log(Object.values(res.data.data)[0])
						})
				})

			setLoading(false)
		} catch (error) {
			setError(error)
		}
	}

	return (
		<div>
			{data ? (
				<div>
					<h1>{data.name}</h1>
					<br />
					<p>{data.lore}</p>
					<h2>Pasiva: {data.passive.name}</h2>
					<p>{data.passive.description}</p>
					<img
						src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/passive/${data.passive.image.full}`}
						alt="Pasiva"
					/>
					<h2>Q: {data.spells[0].name}</h2>
					<img
						src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[0].image.full}`}
						alt="Q"
					/>
					<p>{data.spells[0].description}</p>
					<h2>W: {data.spells[1].name}</h2>
					<img
						src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[1].image.full}`}
						alt="W"
					/>
					<p>{data.spells[1].description}</p>
					<h2>E: {data.spells[2].name}</h2>
					<img
						src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[2].image.full}`}
						alt="E"
					/>
					<p>{data.spells[2].description}</p>
					<h2>R: {data.spells[3].name}</h2>
					<img
						src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/${data.spells[3].image.full}`}
						alt="R"
					/>
					<p>{data.spells[3].description}</p>
					<br />
					<img
						src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.id}_0.jpg`}
						alt=""
					/>
				</div>
			) : (
				<strong>Loading..</strong>
			)}
		</div>
	)
}

export default Home
