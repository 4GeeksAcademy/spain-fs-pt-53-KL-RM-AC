import React, { useContext } from "react";
import { Link } from "react-router-dom";
import compis6 from "../../img/compis6.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { FadeMenu } from './FadeMenu';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { red } from '@mui/material/colors';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const { favoriteProfiles } = store;
    const token = store.token;
    const color = red[900];

    const handleRemoveFavorite = async (profileId) => {
        const success = await actions.removeFavoriteProfile(profileId);
        if (success) {
            actions.getFavoriteProfiles();
        }
    };

    return (
        <div className="custom-navbar">
            <div className="logo me-auto">
                {token ? (
                    <Link to="/homelogged">
                        <img className="navbar-brand imageLogo" src={compis6} alt="" />
                    </Link>
                ) : (
                    <Link to="/">
                        <img className="navbar-brand imageLogo" src={compis6} alt="" />
                    </Link>
                )}
            </div>

            {/* Renderiza el componente FadeMenu en pantallas pequeñas */}
            <div className="d-md-none">
                <FadeMenu />
            </div>
            
            {/* Resto del Navbar */}
            <div className="d-none d-md-flex align-items-center">
                {token && (
                    <div className="favoritos">
                        <div className="dropdown">
                            <IconButton type="button" className="btn btn-primary position-relative" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-heart"></i>
                                <Badge badgeContent={favoriteProfiles.length} color="error"></Badge>
                            </IconButton>
                            <ul className="dropdown-menu m-2" aria-labelledby="dropdownMenuClickableInside">
                                {favoriteProfiles.length > 0 ? (
                                    favoriteProfiles.map(profile => (
                                        <li key={profile.id} className="d-flex li justify-content-between">
                                            <Link to={`/learnmore/${profile.id}`} className="link">
                                                <p className="name">
                                                    {profile.user_name} {profile.last_name}
                                                </p>
                                            </Link>
                                            <i className="button fa-solid fa-xmark" onClick={() => handleRemoveFavorite(profile.id)}></i>
                                        </li>
                                    ))
                                ) : (
                                    <li className="d-flex li justify-content-center">
                                        <p>No tienes ningún favorito</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="d-flex">
                    {token && (
                        <>
                            <div className="m-3">
                                <Link to="/profile" className="link"><i className="fa-regular fa-user"></i> Mi perfil</Link>
                            </div>
                            <div className="m-3">
                                <Link to="/finder" className="link"><i className="fa-solid fa-magnifying-glass"></i>  Buscar</Link>
                            </div>
                        </>
                    )}
                    {!token ? (
                        <>
                            <div className="m-3">
                                <Link to={'/user-signup'} className="link"><i className="fa-solid fa-user-plus"></i> Registrarse</Link>
                            </div>
                            <div className="m-3">
                                <Link to="/user-login" className="link"><i className="fa-solid fa-arrow-right-to-bracket"></i> Iniciar Sesión</Link>
                            </div>
                        </>
                    ) : (
                        <div className="m-3">
                            <Link to="/user-login" className="link" onClick={() => actions.logout()}><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
