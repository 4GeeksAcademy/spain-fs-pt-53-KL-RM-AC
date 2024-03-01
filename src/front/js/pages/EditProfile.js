import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const EditProfile = () => {
	const { store, actions } = useContext(Context);
// cambiar el estado 
	return (
		<div className=" container mt-5 p-3 justify-content-center">
			<h3 className="text-center">Editar Perfil</h3>
			<form>
				<div className="name d-flex">
					<div className="m-3">
						<label for="inputFirstName" className="form-label fw-bold">Nombre</label>
						<div>
							<input type="text" className="form-control" id="FirstName" />
						</div>
					</div>
					<div className="m-3">
					
						<label for="inputLastName" className="form-label fw-bold">Apellidos</label>
						<div >
							<input type="text" className="form-control" id="inputLastName" />
						</div>
					</div>

				</div>
				<div className="m-3 justify-content-center">
					<label for="inputEmail" className="form-label fw-bold">Email</label>
					<div>
						<input type="email" className="form-control" id="inputEmail" />
					</div>
				</div>
				<div className="d-flex">
					<div className="m-3">
					<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Que es lo que buscas?</label>

						<select className="form-select " aria-label="Default select example">
							<option selected>Que buscas?</option>
							<option value="1"> Tengo piso y busco roomie</option>
							<option value="2">Busco roomie con piso</option>
						</select>
						<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Cual es tu presupuesto?</label>

						<select className="form-select" aria-label="Default select example">
							<option selected> Elige tu Presupuesto</option>
							<option value="1">Hasta 300</option>
							<option value="2">Hasta 500</option>
							<option value="2">Hasta 700</option>
						</select>
						<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Tienes mascota</label>

						<select className="form-select" aria-label="Default select example">
							<option selected>Tienes mascota?</option>
							<option value="1">Si</option>
							<option value="2">No</option>
						</select>
						<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Genero</label>

						<select className="form-select " aria-label="Default select example">
							<option selected>Selecciona te genero</option>
							<option value="1">Mujer</option>
							<option value="2">Hombre</option>
						</select>
					</div>
					<div className="m-3">
					<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Ubicacion</label>

						<select className="form-select " aria-label="Default select example">
							<option selected>Selecciona tu Ubicacion</option>
							<option value="1">API</option>
							<option value="2">API</option>
							<option value="2">API</option>
						</select>
						<div>
							<label for="exampleFormControlTextarea1" className="form-label mt-2 fw-bold">Por que serias el compi ideal?</label>
							<textarea className="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-center">
				<button type="button" className="btn btn-dark me-2">Editar Perfil</button>
				<button type="button" className="btn btn-dark">Cambiar Contrasena</button>
				</div>


			</form>
		</div>
	);
};
