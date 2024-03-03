import React from "react";
import { Link } from "react-router-dom";
import compislogo from "../../img/compis.png";
import "../../styles/navbar.css";


export const Navbar = () => {
	return (
		<nav className="navbar custom-navbar">
			<div className="container d-flex">
				<Link to="/">
					<a className="navbar-brand " href="#">
						<img src={compislogo} alt="logo star wars" width="100" height="90" />
					</a>
				</Link>

				<div className="ml-auto d-flex align-self-center justify-content-end">
					<Link to="/demo">
						<span className="custom-span d-flex justify-content-end p-2">Mi perfil</span>
					</Link>
					<Link to="/demo">
						<span className="custom-span d-flex justify-content-end p-2">Mis favoritos</span>
					</Link>
					<Link to="/demo">
						<span className="custom-span d-flex justify-content-end p-2">Buscar</span>
					</Link>
					<Link to="/demo">
						<span className="custom-span d-flex justify-content-end p-2">Cerrar sesión</span>
					</Link>

				</div>
			</div>
		</nav>
	);
};
