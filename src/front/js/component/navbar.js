import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import compislogo from "../../img/compis.png";
import "../../styles/navbar.css";


export const Navbar = () => {
	return (
		<div className="d-flex  custom-navbar">
			<div >
				<Link to="/">
					<a className="navbar-brand " href="#">
						<img className="imageLogo" src={compislogo} alt="logo star wars"/>
					</a>
				</Link>
			</div>
			<div className="textNavbar">
				<Link to="/demo">
					<span> Mi perfil</span>
				</Link>
				<Link to="/demo">
					<span>Mis favoritos</span>
				</Link>
				<Link to="/demo">
					<span >Buscar</span>
				</Link>
				<Link to="/demo">
					<span>Cerrar sesión</span>
				</Link>
			</div>
		</div>
	);
};
