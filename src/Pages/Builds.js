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

	const eliminarBuild = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
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
				Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
			}
		})
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
			<div className="cabecera">
				<h1>Builds</h1>
				<input type="search" name="Buscar" placeholder="Buscar Campeones" />
			</div>
			<hr />
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
				<div className="grid">
					{builds.map((build) => {
						return (
							<ItemsComponent
								key={build._id}
								id={build._id}
								eliminar={eliminarBuild}
								nombre={build.nombre}
								items={build.items}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default Builds
