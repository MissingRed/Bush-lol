import React from 'react'
import { Link } from 'react-router-dom'

const LoginMensaje = (props) => {
	return (
		<div className="welcome-container">
			<div className="text-welcome">
				<h1>{props.title}</h1>
				<br />
				<p>Inicia sesión para para ver esta sección</p>
				<Link to="/login">
					<div className="welcome-btn hero-btn-two">Iniciar sesión</div>
				</Link>
				<img src="/img/support.png" className="jinx-welcome mensaje" alt="" />
				<img src="/img/lux.png" className="yasuo-welcome" alt="" />
			</div>
		</div>
	)
}

export default LoginMensaje
