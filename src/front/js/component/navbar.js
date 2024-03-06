import React, { useContext } from "react";
import { Link } from "react-router-dom";
import compislogo from "../../img/compis.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const {store, actions}= useContext(Context)

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
				<Link to="/profile">
					<span> Mi perfil</span>
				</Link>
				<Link to="/demo">
					<span>Mis favoritos</span>
				</Link>
				<Link to="/demo">
					<span >Buscar</span>
				</Link>
				<Link to="/user-login">
					<span onClick={()=> actions.logout()}>Cerrar sesión</span>
				</Link>
			</div>
		</div>
	);
};
