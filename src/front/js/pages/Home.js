import React, { useContext } from "react";
import { Context } from "../store/appContext";
import HangOut from "../../img/Hang out-cuate.png"
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="row home d-flex">
			<div className="col-7">
				<div className="d-flex m-0 col-4">
					<p className="title">COMPIS</p>
					<p className="subtitle">APP</p>
				</div>
				<div className="container ">
					<p className="textHome p-2">
						Sabemos lo dificil que es encontrar a tu match...pero estamos aquí para ayudarte a encontrar a tu compi de piso perfecto.
					</p>
				</div>
				<div className="text-center">
					<p className="question">
						¿Quieres unirte a la comunidad?
					</p>
					<Link to={"/user-signup"}>
						<button type="button" className="btn btn-dark me-2 btn-lg"><i className="fa-solid fa-magnifying-glass"></i>  Buscar Roomie</button>
					</Link>

				</div>
			</div>
			<div className="col-5">
				<div className="possition-relative">
					<img src={HangOut} className="hangoutImg position-absolute bottom-0 end-0"></img>
				</div>
			</div>
		</div>
	);
};
