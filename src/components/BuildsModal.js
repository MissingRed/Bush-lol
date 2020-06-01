import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BuildsModal = ({ close, nueva }) => {
	const [data, setData] = useState([])
	const [textoBusqueda, setTextoBusqueda] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [Build, setBuild] = useState([null, null, null, null, null, null])
	const [itemSelected, setItemSelected] = useState('')

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			await axios
				.get(
					'http://ddragon.leagueoflegends.com/cdn/10.10.3216176/data/es_MX/item.json'
				)
				.then((res) => {
					console.log(Object.values(res.data.data))
					setData(Object.values(res.data.data))
				})
		} catch (error) {}
	}

	const handleChange = (e) => {
		const texto = e.target.value
		setTextoBusqueda(texto)

		const search = data.filter((item) => {
			return `${item.name} ${item.tags}`
				.toLowerCase()
				.includes(texto.toLowerCase())
		})

		setSearchResult(search)
	}

	const AñadirItem = (position) => {
		let NuevoArray = Build
		NuevoArray[position] = itemSelected
		setBuild(NuevoArray)
	}

	return (
		<div>
			<div className="back-builds-modal" onClick={close}></div>
			<div className="builds-modal">
				<h1>{nueva ? 'Nueva build' : 'Editar build'}</h1>
				<input
					className="input-nombre-build"
					type="text"
					placeholder="Nombre de la build ..."
				/>
				<div className="buttons-modal">
					<button onClick={() => AñadirItem(0)}>
						{Build[0] ? (
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${Build[0]}`}
								alt=""
							/>
						) : (
							<img src="/img/plus.svg" alt="" />
						)}
					</button>
					<button onClick={() => AñadirItem(1)}>
						{Build[1] ? (
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${Build[1]}`}
								alt=""
							/>
						) : (
							<img src="/img/plus.svg" alt="" />
						)}
					</button>
					<button onClick={() => AñadirItem(2)}>
						{Build[2] ? (
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${Build[2]}`}
								alt=""
							/>
						) : (
							<img src="/img/plus.svg" alt="" />
						)}
					</button>
					<button onClick={() => AñadirItem(3)}>
						{Build[3] ? (
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${Build[3]}`}
								alt=""
							/>
						) : (
							<img src="/img/plus.svg" alt="" />
						)}
					</button>
					<button onClick={() => AñadirItem(4)}>
						{Build[4] ? (
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${Build[4]}`}
								alt=""
							/>
						) : (
							<img src="/img/plus.svg" alt="" />
						)}
					</button>
					<button onClick={() => AñadirItem(5)}>
						{Build[5] ? (
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${Build[5]}`}
								alt=""
							/>
						) : (
							<img src="/img/plus.svg" alt="" />
						)}
					</button>
				</div>
				<div className="input-modal">
					<input
						type="text"
						placeholder="Buscar items"
						onChange={handleChange}
					/>
				</div>
				{!textoBusqueda ? (
					<div className="items-modal">
						{data.map((item, index) => {
							return (
								<button
									key={index}
									onClick={() => setItemSelected(item.image.full)}
								>
									<img
										src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${item.image.full}`}
										alt=""
									/>
								</button>
							)
						})}
					</div>
				) : null}
				{!searchResult.length && textoBusqueda ? (
					<div className="items-modal">
						<div>
							<span>{`No se encontró el item: ${textoBusqueda}`}</span>
						</div>
					</div>
				) : null}
				{searchResult.length && textoBusqueda ? (
					<div className="items-modal">
						{searchResult.map((item, index) => {
							return (
								<button
									key={index}
									onClick={() => setItemSelected(item.image.full)}
								>
									<img
										src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${item.image.full}`}
										alt=""
									/>
								</button>
							)
						})}
					</div>
				) : null}
				<div className="btn-modal-builds">
					<button className="welcome-btn">
						{nueva ? 'Guardar' : 'Actualizar'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default BuildsModal
