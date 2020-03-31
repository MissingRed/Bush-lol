import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
	return (
		<div className="login-register">
			<div className="form-login-register">
				<Link to="/">
					<img className="logo" src="/img/logo.png" alt="Logo" />
				</Link>
				<form>
					<h1>Regístrarse</h1>
					<input placeholder="Usuario" type="text" name="" id="" />
					<input placeholder="Correo" type="email" name="" id="" />
					<input placeholder="Contraseña" type="password" name="" id="" />
					<input
						placeholder="Confirmar contraseña"
						type="password"
						name=""
						id=""
					/>
					<input type="submit" value="Regístrarse" />
				</form>
				<Link to="/login">
					<strong>Inciar sesión</strong>
				</Link>
			</div>
			<div className="img-login-register"></div>
		</div>
	)
}

export default Register
