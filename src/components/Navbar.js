import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const Navbar = () => {
	const [name, setName] = useState('')

	useEffect(() => {
		if (localStorage.usertoken) {
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			setName(decoded.username)
		}
		return () => {}
	}, [])

	return (
		<nav>
			<Link to="/">
				<img className="logo" src="/img/logo.png" alt="Logo" />
			</Link>
			<div className="nav-container">
				<NavLink to="/champions" activeClassName="selectedNav">
					Lista de campeones
				</NavLink>
				<NavLink to="/favorites" activeClassName="selectedNav">
					Campeones favoritos
				</NavLink>
				<NavLink to="/builds" activeClassName="selectedNav">
					Builds
				</NavLink>
				<img className="search-icon" src="/img/search.svg" alt="search" />
				<img className="idioma-icon" src="/img/idioma.svg" alt="idioma" />
				{!localStorage.usertoken ? (
					<div className="lr-container">
						<Link to="/login">Iniciar sesión</Link>
						<Link to="/register">
							<div className="register-btn">Regístrarse</div>
						</Link>
					</div>
				) : (
					<div className="profile-nav">
						<span>{name}</span>
						<img
							className="foto-perfil"
							src="/img/foto-perfil.png"
							alt="Profile"
						/>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
