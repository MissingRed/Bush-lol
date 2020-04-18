import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import jwt_decode from 'jwt-decode'
import { Redirect, Link } from 'react-router-dom'

const Bienvenida = () => {
	const [name, setName] = useState('')

	useEffect(() => {
		if (localStorage.usertoken) {
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			setName(decoded.username)
		}
		return () => {}
	}, [])

	if (!localStorage.usertoken) {
		return <Redirect to="/" />
	}

	return (
		<div className="contenedor-princial">
			<Navbar />
			<div className="welcome-container">
				<div className="text-welcome">
					<h1>{`Hola ${name}`}</h1>
					<br />
					<p>
						tu cuenta se creó satisfactoriamente, <br />
						ahora puedes empezar a crear builds personalizadas
						<br /> y listar tus campeones favoritos.
					</p>
					<Link to="/champions">
						<div className="welcome-btn">Continuar</div>
					</Link>
					<img src="/img/jinxw.png" className="jinx-welcome" alt="" />
					<img src="/img/yasuo.png" className="yasuo-welcome" alt="" />
				</div>
			</div>
		</div>
	)
}

export default Bienvenida
