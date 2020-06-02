import React, { useEffect, useState } from 'react'
import ItemsComponent from '../components/ItemsComponent'
import LoginMensaje from '../components/LoginMensaje'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
import BuildsModal from '../components/BuildsModal'

const Builds = () => {
	const [builds, setBuilds] = useState([])
	const [email, setEmail] = useState('')
	const [toggleModal, setToggleModal] = useState(false)
	const [toggleModalEditar, setToggleModalEditar] = useState(false)

	const [nombreEditar, setNombreEditar] = useState('')
	const [buildEditar, setBuildEditar] = useState('')
	const [idEditar, setIdEditar] = useState('')

	const [textoBusqueda, setTextoBusqueda] = useState('')
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		if (localStorage.usertoken) {
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			traerBuilds(decoded.email)
			setEmail(decoded.email)
		}
	}, [])

	const traerBuilds = async (email) => {
		const response = await axios.get(`builds/${email}`)
		setBuilds(response.data)
	}

	const handleChange = (e) => {
		const texto = e.target.value
		setTextoBusqueda(texto)

		const search = builds.filter((build) => {
			return `${build.nombre}`.toLowerCase().includes(texto.toLowerCase())
		})

		setSearchResult(search)
	}

	const eliminarBuild = (id, nombre) => {
		Swal.fire({
			title: `¿Estas seguro que quieres eliminar la build?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#00d2ff ',
			cancelButtonColor: '#eaeaea',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
		}).then(async (result) => {
			if (result.value) {
				const response = await axios.delete(`builds/${id}/${email}`)
				setBuilds(response.data)
				Swal.fire('Eliminada', 'La build se elimino correctamente.', 'success')
			}
		})
	}

	const EditarBuild = (nombre, build, id) => {
		setNombreEditar(nombre)
		setBuildEditar(build)
		setIdEditar(id)
		setToggleModalEditar(true)
	}

	if (!localStorage.usertoken) {
		return (
			<div className="contenedor-princial">
				<LoginMensaje title="Builds" />
			</div>
		)
	}
	return (
		<div className="contenedor-princial">
			{toggleModal ? (
				<BuildsModal
					email={email}
					nueva
					listaBuilds={(e) => setBuilds(e)}
					close={() => setToggleModal(false)}
				/>
			) : null}
			{toggleModalEditar ? (
				<BuildsModal
					email={email}
					listaBuilds={(e) => setBuilds(e)}
					nombre={nombreEditar}
					build={buildEditar}
					id={idEditar}
					close={() => setToggleModalEditar(false)}
				/>
			) : null}
			<div className="list-title">
				<h1>Builds</h1>
				<div className="input-list-container">
					<img className="search-icon" src="/img/search.svg" alt="search" />
					<input
						placeholder="Buscar builds"
						onChange={handleChange}
						type="text"
					/>
				</div>
			</div>
			<div className="agregar">
				<button className="addBuild-btn" onClick={() => setToggleModal(true)}>
					Agregar nueva Build
					<img src="/img/plus-circle.svg" alt="" />
				</button>
			</div>
			{builds.length === 0 ? (
				<div className="no-builds">
					<h1>Aun no tienes builds</h1>
				</div>
			) : (
				<div>
					{!textoBusqueda ? (
						<div className="grid">
							{builds.map((build) => {
								return (
									<ItemsComponent
										key={build._id}
										id={build._id}
										editar={EditarBuild}
										eliminar={eliminarBuild}
										nombre={build.nombre}
										items={build.items}
									/>
								)
							})}
						</div>
					) : null}
					{!searchResult.length && textoBusqueda ? (
						<div className="no-builds">
							<h1>{`No se encontró la build: ${textoBusqueda}`}</h1>
						</div>
					) : null}
					{searchResult.length && textoBusqueda ? (
						<div className="grid">
							{searchResult.map((build) => {
								return (
									<ItemsComponent
										key={build._id}
										id={build._id}
										editar={EditarBuild}
										eliminar={eliminarBuild}
										nombre={build.nombre}
										items={build.items}
									/>
								)
							})}
						</div>
					) : null}
				</div>
			)}
		</div>
	)
}

export default Builds
