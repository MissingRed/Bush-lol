import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav>
			<Link to="/">
				<img className="logo" src="/img/logo.png" alt="Logo" />
			</Link>
			<div className="nav-container">
				<Link to="/champions">Lista de campeones</Link>
				<Link to="/favorites">Campeones favoritos</Link>
				<img className="search-icon" src="/img/search.svg" alt="search" />
				<img className="idioma-icon" src="/img/idioma.svg" alt="idioma" />
				<img className="foto-perfil" src="/img/foto-perfil.png" alt="Profile" />
			</div>
		</nav>
	)
}

export default Navbar
