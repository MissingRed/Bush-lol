import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom'

const Register = (props) => {
	const [user, setUser] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setconfirmPassword] = useState('')
	const [alertEmail, setAlertEmail] = useState(false)
	const [alertConfirmPassword, setAlertconfirmPassword] = useState(false)
	const [blockButton, setBlockButton] = useState(false)
	const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/

	const handleSubmit = (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setAlertconfirmPassword(true)
		} else {
			setAlertconfirmPassword(false)
		}

		if (email.match(pattern)) {
			setAlertEmail(false)
		} else {
			setAlertEmail(true)
		}

		if (email.match(pattern) && user && email && password === confirmPassword) {
			PostData()
		}
	}

	const PostData = async () => {
		setBlockButton(true)
		await axios
			.post('users/register', {
				username: user,
				email: email.toLowerCase(),
				password: password,
			})
			.then((response) => {
				const data = response.data
				if (data.status === `${email} Registered!`) {
					console.log('Registered')
					axios
						.post('users/login', {
							email: email.toLowerCase(),
							password: password,
						})
						.then((response) => {
							localStorage.setItem('usertoken', response.data)
							props.history.push(`/welcome`)
							return response.data
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
				}
				if (data.error) {
					if (data.error === 'User already exists') {
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: `${email} ya se encuentra registrado.`,
							showConfirmButton: false,
							timer: 3000,
						})
					} else {
						Swal.fire({
							position: 'center',
							icon: 'error',
							title: `Ocurrió un error intenta mas tarde.`,
							showConfirmButton: false,
							timer: 3000,
						})
					}
				}
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
					<h1>Regístrarse</h1>
					<input
						placeholder="Usuario"
						onChange={(e) => {
							setUser(e.target.value)
						}}
						maxLength="15"
						type="text"
						required
					/>
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
						minLength="8"
						value={password}
						type="password"
						required
					/>
					<span className="alert-form">
						{alertConfirmPassword ? 'Las contraseñas no coinciden' : ''}
					</span>
					<input
						placeholder="Confirmar contraseña"
						onChange={(e) => {
							setconfirmPassword(e.target.value)
						}}
						type="password"
						value={confirmPassword}
						required
					/>
					{blockButton ? (
						<div className="container-loader">
							<Loader />
						</div>
					) : (
						<input type="submit" value="Regístrarse" />
					)}
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
