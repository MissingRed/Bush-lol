import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
	return (
		<div className="login-register">
			<div className="form-login-register">
				<Link to="/">
					<img className="logo" src="/img/logo.png" alt="Logo" />
				</Link>
				<form>
					<h1>Iniciar sesión</h1>
					<input placeholder="Correo" type="email" name="" id="" />
					<input placeholder="Contraseña" type="password" name="" id="" />
					<input type="submit" value="iniciar sesión" />
				</form>
				<Link to="/register">
					<strong>Crear una cuenta</strong>
				</Link>
			</div>
			<div className="img-login-register"></div>
		</div>
	)
}

export default Login
