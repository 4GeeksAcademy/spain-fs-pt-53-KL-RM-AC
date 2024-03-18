import React from "react";
import noData from "../../img/No data-amico.png"
import { Link } from "react-router-dom";
import "../../styles/pageNotAllowed.css";

export const PageNotAllowed = () => {

	return (
		<div className="PageNotAllowed container">
			<div>
				<h5 className="text-center mt-4"><i class="fa-solid fa-triangle-exclamation"></i> Debes <Link to={"/user-signup"} className="link">Registrarte</Link> o <Link to={"/user-login"} className="link">Iniciar sesion</Link> para acceder a esta vista.</h5>
			</div>
			<div className="container col-6">
				<img src={noData} style={{ width: '450px', height: '450px' }} />
			</div>

		</div>
	);
};
