import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ItemComponent = ({ id, eliminar, nombre, items, editar }) => {
	const [data, setData] = useState('')

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			await axios
				.get(
					'http://ddragon.leagueoflegends.com/cdn/10.10.3216176/data/en_US/item.json'
				)
				.then((res) => {
					setData(res.data)
				})
		} catch (error) {}
	}

	return (
		<div>
			{data ? (
				<div>
					<div className="box">
						<div className="header">
							<h1>{nombre}</h1>
							<div className="icons">
								<img
									src="/img/edit.svg"
									onClick={() => editar(nombre, items, id)}
									alt="edit"
								/>
								<img
									src="/img/trash-2.svg"
									onClick={() => eliminar(id, nombre)}
									alt="eliminar"
								/>
							</div>
						</div>
						<div className="itemsAdd">
							<div className="item1">
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${items[0]}`}
									alt=""
								/>
								<div>
									<p>{data.data[items[0].replace('.png', '')].name}</p>
								</div>
							</div>
							<div className="item1">
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${items[1]}`}
									alt=""
								/>
								<p>{data.data[items[1].replace('.png', '')].name}</p>
							</div>
							<div className="item1">
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${items[2]}`}
									alt=""
								/>
								<p>{data.data[items[2].replace('.png', '')].name}</p>
							</div>
							<div className="item1">
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${items[3]}`}
									alt=""
								/>
								<p>{data.data[items[3].replace('.png', '')].name}</p>
							</div>
							<div className="item1">
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${items[4]}`}
									alt=""
								/>
								<p>{data.data[items[4].replace('.png', '')].name}</p>
							</div>
							<div className="item1">
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/item/${items[5]}`}
									alt=""
								/>
								<p>{data.data[items[5].replace('.png', '')].name}</p>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
export default ItemComponent
