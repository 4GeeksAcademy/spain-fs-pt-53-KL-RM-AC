import React, { useContext } from "react";
import { Context } from "../store/appContext";
import HangOut from "../../img/Hang out-cuate.png"
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div className="d-flex m-0">
				<p className="title">COMPIS</p>
				<p className="subtitle">APP</p>
			</div>
			<div className="container">
				<div className="line"></div>
				<p className="texto col-6">
					Sabemos lo dificil que es encontrar a tu match...pero estamos aquí para ayudarte a encontrar a tu compi de piso perfecto
				</p>
			</div>
			<div className="col-6 text-center">
				<p className="question">
					¿Quieres unirte a la comunidad?
				</p>
				<button type="button" className="btn btn-dark me-2">Buscar Roomie</button>
			</div>
			<div className="possition-relative">
				<img src={HangOut} className="hangoutImg position-absolute bottom-0 end-0"></img>
			</div>
		</div>
	);
};
