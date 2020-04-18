import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Login = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alertEmail, setAlertEmail] = useState(false)
	const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/
	const [blockButton, setBlockButton] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (email.match(pattern)) {
			setAlertEmail(false)
		} else {
			setAlertEmail(true)
		}

		if (email.match(pattern) && email && password) {
			PostData()
		}
	}

	const PostData = async () => {
		setBlockButton(true)
		await axios
			.post('users/login', {
				email: email.toLowerCase(),
				password: password,
			})
			.then((response) => {
				const data = response.data

				if (data.error) {
					if (data.error === 'User does not exist') {
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: `El correo o la contraseña es incorrecto.`,
							showConfirmButton: false,
							timer: 1500,
						})
					} else {
						Swal.fire({
							position: 'center',
							icon: 'error',
							title: `Ocurrió un error al iniciar sesión por favor intenta mas tarde.`,
							showConfirmButton: false,
							timer: 3000,
						})
					}
				} else {
					localStorage.setItem('usertoken', response.data)
					props.history.push(`/champions`)
					return response.data
				}
			})
			.catch((err) => {
				console.log(err)
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: `Ocurrió un error al iniciar sesión por favor intenta mas tarde.`,
					showConfirmButton: false,
					timer: 3000,
				})
			})
		setBlockButton(false)
	}

	if (localStorage.usertoken) {
		return <Redirect to="/" />
	}

	return (
		<div className="login-register">
			<div className="form-login-register">
				<Link to="/">
					<img className="logo" src="/img/logo.png" alt="Logo" />
				</Link>
				<form onSubmit={(e) => handleSubmit(e)}>
					<h1>Iniciar sesión</h1>
					<span className="alert-form">
						{alertEmail ? 'Ingresa un correo electrónico valido' : ''}
					</span>
					<input
						placeholder="Correo electrónico"
						onChange={(e) => {
							setEmail(e.target.value)
						}}
						type="email"
						required
					/>
					<input
						placeholder="Contraseña"
						onChange={(e) => {
							setPassword(e.target.value)
						}}
						value={password}
						type="password"
						required
					/>
					{blockButton ? (
						<div className="container-loader">
							<Loader />
						</div>
					) : (
						<input type="submit" value="iniciar sesión" />
					)}
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
