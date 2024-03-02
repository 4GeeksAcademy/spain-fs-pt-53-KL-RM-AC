import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
 
export const Password = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mt-5 p-3 justify-content-center">
			<h3 className="text-center">Cambiar Contraseña</h3>
			<label for="inputPassword5" className="form-label fw-bold">Contraseña Antigua</label>
			<input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
			<label for="inputPassword5" className="form-label fw-bold mt-3">Nueva Contraseña</label>
			<input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
				<div id="passwordHelpBlock" className="form-text">
 					 Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
				</div>
			<div className="d-flex justify-content-center mt-5 mb-5"> 
				<button type="button" className="btn btn-dark">Cambiar Contrasena</button>
			</div>
			

		</div>
	);
};
