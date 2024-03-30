import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import compis6 from "../../img/compis6.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';


export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const { favoriteProfiles } = store;
    const token = store.token;
    const color = red[900];
    const [activeLink, setActiveLink] = useState(""); // Estado local para realizar un seguimiento de qué enlace está activo

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 4,
            top: 9,
            padding: '2px 4px',
            fontSize: '0.65rem',
            fontWeight: 'bold',
            backgroundColor: color,
            minWidth: '10px',
            height: '14px',
            width: '14px',
        },
    }));

    const handleRemoveFavorite = async (profileId) => {
        const success = await actions.removeFavoriteProfile(profileId);
        if (success) {
            // Si la eliminación fue exitosa, actualizamos la lista de perfiles favoritos
            actions.getFavoriteProfiles();
        }
    };

    return (

        <div className="d-flex custom-navbar">
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
            {!token && (
                <div>
                    <Link to={'/user-signup'} className="link m-3">
                        <p className="m-1">Registrarse</p>
                    </Link>
                </div>
            )}
            <div className="favoritos">
                {token && (
                    <div className="dropdown">
                        <IconButton type="button" className="btn btn-primary position-relative" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-heart"></i>
                            <StyledBadge badgeContent={favoriteProfiles.length} color="red"></StyledBadge>
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
                )}
            </div>
            <div className="d-flex">
                <div onClick={() => setActiveLink("profile")} className={`m-3 ${activeLink === "profile" && "active-link"}`}>
                    <Link to="/profile" className="link"><i className="fa-regular fa-user"></i> Mi perfil</Link>
                </div>
                <div onClick={() => setActiveLink("finder")} className={`m-3 ${activeLink === "finder" && "active-link"}`}>
                    <Link to="/finder" className="link"><i className="fa-solid fa-magnifying-glass"></i>  Buscar</Link>
                </div>
                {!store.token ? (
                    <div onClick={() => setActiveLink("login")} className={`m-3 ${activeLink === "login" && "active-link"}`}>
                        <Link to="/user-login" className="link"><i className="fa-solid fa-arrow-right-to-bracket"></i> Iniciar Sesión</Link>
                    </div>
                ) : (
                    <div onClick={() => { actions.logout(); setActiveLink("") }} className={`m-3 ${activeLink === "login" && "active-link"}`}>
                        <Link to="/user-login" className="link"><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión</Link>
                    </div>
                )}
            </div>


        </div>



    );
};
