import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<div>
			<div className="contenedor-princial">
				<div className="hero">
					<div className="hero-text">
						<h1>
							Aprende las habilidades de tus campeones favoritos <br /> ¡Empieza
							a buscar ya!
						</h1>
						<div className="input-hero">
							<img className="search-icon" src="/img/search.svg" alt="search" />
							<input placeholder="Buscar campeones" type="text" />
						</div>
						<img className="hero-line" src="/img/line.png" alt="" />
					</div>
					<div className="hero-img">
						<img src="/img/akali.png" alt="Hero" />
					</div>
				</div>
				<div className="hero">
					<div className="hero-img">
						<img src="/img/jinx.png" alt="Hero" />
					</div>
					<div className="hero-text">
						<h1>
							Aprende las habilidades de tus campeones favoritos <br /> ¡Empieza
							a buscar ya!
						</h1>
						<Link to="/champions">
							<div className="welcome-btn hero-btn-one">Explorar</div>
						</Link>
						<img className="hero-line" src="/img/line.png" alt="" />
					</div>
				</div>
				<div className="hero">
					<div className="hero-text">
						<h1>
							Aprende las habilidades de tus campeones favoritos <br /> ¡Empieza
							a buscar ya!
						</h1>
						<Link to="/champions">
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
