import React, { useEffect, useState } from 'react'

const Idioma = (props) => {
	const Idiomas = [
		{ id: 'en_US', nombre: 'English (United States)' },
		{ id: 'cs_CZ', nombre: 'Czech (Czech Republic)' },
		{ id: 'de_DE', nombre: 'German (Germany)' },
		{ id: 'el_GR', nombre: 'Greek (Greece)' },
		{ id: 'en_AU', nombre: 'English (Australia)' },
		{ id: 'en_GB', nombre: 'English (United Kingdom)' },
		{ id: 'en_PH', nombre: 'English (Republic of the Philippines)' },
		{ id: 'en_SG', nombre: 'English (Singapore)' },
		{ id: 'es_AR', nombre: 'Spanish (Argentina)' },
		{ id: 'es_ES', nombre: 'Spanish (Spain)' },
		{ id: 'es_MX', nombre: 'Spanish (Mexico)' },
		{ id: 'fr_FR', nombre: 'French (France)' },
		{ id: 'hu_HU', nombre: 'Hungarian (Hungary)' },
		{ id: 'id_ID', nombre: 'Indonesian (Indonesia)' },
		{ id: 'it_IT', nombre: 'Italian (Italy)' },
		{ id: 'ja_JP', nombre: 'Japanese (Japan)' },
		{ id: 'ko_KR', nombre: 'Korean (Korea)' },
		{ id: 'pl_PL', nombre: 'Polish (Poland)' },
		{ id: 'pt_BR', nombre: 'Portuguese (Brazil)' },
		{ id: 'ro_RO', nombre: 'Romanian (Romania)' },
		{ id: 'ru_RU', nombre: 'Russian (Russia)' },
		{ id: 'th_TH', nombre: 'Thai (Thailand)' },
		{ id: 'tr_TR', nombre: 'Turkish (Turkey)' },
		{ id: 'vn_VN', nombre: 'Vietnamese (Viet Nam)' },
		{ id: 'zh_CN', nombre: 'Chinese (China)' },
		{ id: 'zh_MY', nombre: 'Chinese (Malaysia)' },
		{ id: 'zh_TW', nombre: 'Chinese (Taiwan)' },
	]

	const [idiomaEstado, setIdiomaEstado] = useState('')

	useEffect(() => {
		setIdiomaEstado(localStorage.idioma)
		window.addEventListener('storage', (e) => {
			setIdiomaEstado(localStorage.idioma)
		})
		return () => {
			window.removeEventListener('storage', (e) => {
				setIdiomaEstado(localStorage.idioma)
			})
		}
	}, [])

	const CambiarIdioma = (i) => {
		localStorage.setItem('idioma', i)
		setIdiomaEstado(i)
	}

	return (
		<div>
			<div className="modal-back" onClick={props.close}></div>
			<div className="modal-idiomas">
				<div className="modal-idiomas-title">
					<h1>Idioma</h1>
					<img onClick={props.close} src="/img/x.svg" alt="X" />
				</div>
				<ul className="idiomas-container">
					{Idiomas.map((idioma, index) => {
						if (!idiomaEstado) {
							if (idioma.id === 'es_MX') {
								return (
									<label key={index} className="container">
										{idioma.nombre}
										<input
											onChange={() => CambiarIdioma(idioma.id)}
											type="radio"
											checked="checked"
											name="radio"
										/>
										<span className="checkmark"></span>
									</label>
								)
							}
						}
						if (idiomaEstado) {
							if (idiomaEstado === idioma.id) {
								return (
									<label key={index} className="container">
										{idioma.nombre}
										<input
											onChange={() => CambiarIdioma(idioma.id)}
											checked="checked"
											type="radio"
											name="radio"
										/>
										<span className="checkmark"></span>
									</label>
								)
							}
						}
						return (
							<label key={index} className="container">
								{idioma.nombre}
								<input
									onChange={() => CambiarIdioma(idioma.id)}
									type="radio"
									name="radio"
								/>
								<span className="checkmark"></span>
							</label>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Idioma
