import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import compislogo from "../../img/compis.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [favoriteProfiles, setFavoriteProfiles] = useState([]);

	// const handleRemoveFavorite = async (profileId) => {
	//     // Llama a la acción para eliminar el perfil favorito
	//     const success = await actions.removeFavoriteProfile(profileId);

	//     if (success) {
	//         // Actualiza la lista de perfiles favoritos después de eliminar uno
	//         actions.getFavoriteProfiles().then(data => {
	//             setFavoriteProfiles(data);
	//         });
	//     }
	// };

	useEffect(() => {
		// Llama a la acción para obtener perfiles favoritos cuando el componente se monta
		actions.getFavoriteProfiles().then(data => {
			setFavoriteProfiles(data);
		});
	}, [actions]);

	return (
		<div className="d-flex  custom-navbar">
			<div >
				<Link to="/">
					<a className="navbar-brand " href="#">
						<img className="imageLogo" src={compislogo} alt="logo star wars" />
					</a>
				</Link>
			</div>

			<div className="dropdown">
				<button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" aria-expanded="false">
					Mis favoritos ({favoriteProfiles.length})
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
					{favoriteProfiles.map(profile => (
						<li key={profile.id}>
							<p>
								{profile.user_name} {profile.last_name}
							</p>
						</li>
					))}
				</ul>
			</div>

			<div className="textNavbar">
				<Link to="/profile">
					<span> Mi perfil</span>
				</Link>
				<Link to="/finder">
					<span >Buscar</span>
				</Link>
				<Link to="/user-login">
					<span onClick={() => actions.logout()}>Cerrar sesión</span>
				</Link>
			</div>
		</div>
	);
};


//<i className="fa-solid fa-trash"></i>