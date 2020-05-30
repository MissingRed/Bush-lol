import React from 'react'
import LoginMensaje from '../components/LoginMensaje'

const Builds = () => {
	if (!localStorage.usertoken) {
		return (
			<div className="contenedor-princial">
				<LoginMensaje title="Builds" />
			</div>
		)
	}
	return (
		<div className="contenedor-princial">
			<h1>Builds</h1>
		</div>
	)
}

export default Builds
