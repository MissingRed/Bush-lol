import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BarraBusqueda from '../components/BarraBusqueda'

const Home = () => {
	const [toggleModal, setToggleModal] = useState(false)

	return (
		<div>
			{toggleModal ? (
				<BarraBusqueda close={() => setToggleModal(false)} />
			) : null}
			<div className="contenedor-princial">
				<div className="hero">
					<motion.div
						initial={{ opacity: 0, x: 100, y: 100 }}
						animate={{ opacity: 1, x: 0, y: 0 }}
						transition={{ duration: 1 }}
						className="hero-text"
					>
						<h1>
							Aprende las habilidades de tus campeones favoritos <br /> ¡Empieza
							a buscar ya!
						</h1>
						<div className="input-hero" onClick={() => setToggleModal(true)}>
							<img className="search-icon" src="/img/search.svg" alt="search" />
							<input placeholder="Buscar campeones" type="text" disabled />
						</div>
						<img className="hero-line" src="/img/line.png" alt="" />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: -100, y: -100 }}
						animate={{ opacity: 1, x: 0, y: 0 }}
						transition={{ duration: 1 }}
						className="hero-img"
					>
						<img src="/img/akali.png" alt="Hero" />
					</motion.div>
				</div>
				<div className="hero">
					<div className="hero-img">
						<img src="/img/jinx.png" alt="Hero" />
					</div>
					<div className="hero-text">
						<h1>
							Crea Builds personalizadas <br /> para tus campeones
						</h1>
						<Link to="/builds">
							<div className="welcome-btn hero-btn-one">Explorar</div>
						</Link>
						<img className="hero-line" src="/img/line.png" alt="" />
					</div>
				</div>
				<div className="hero">
					<div className="hero-text">
						<h1>
							Crea un lista de tus <br /> campeones favoritos
						</h1>
						<Link to="/favorites">
							<div className="welcome-btn hero-btn-two">Explorar</div>
						</Link>
						<img className="hero-line" src="/img/line.png" alt="" />
					</div>
					<div className="hero-img">
						<img src="/img/Rize.png" alt="Hero" />
					</div>
				</div>
			</div>
			<footer>
				<div className="conatiner-footer">
					<img src="/img/logo-white.png" alt="Logo" />
					<img className="img-redes" src="/img/redes.png" alt="" />
					<span>™ & © 2020 Bush.gg, Inc.</span>
					<div className="footer-images">
						<img src="/img/pegi.png" alt="" />
						<img src="/img/usk-12.png" alt="" />
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Home
