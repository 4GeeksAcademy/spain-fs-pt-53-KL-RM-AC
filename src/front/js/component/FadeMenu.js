import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import '../../styles/navbar.css';

export const FadeMenu = () => {
    const { store, actions } = useContext(Context);
    const { favoriteProfiles } = store;
    const token = store.token;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="d-flex align-items-center"> 
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
            
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}

            >
                <i className=" icon fa-solid fa-bars fa-xl"></i>
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                className="mt-4"
            >

                {token && (
                    <>
                        <MenuItem className="custom-menu-item" onClick={handleClose}> {/* Aplica la clase CSS personalizada al elemento MenuItem */}
                            <Link to="/profile"><i className="fa-regular fa-user"></i> Mi perfil</Link> {/* Envuelve el enlace dentro del elemento MenuItem */}
                        </MenuItem>
                        <MenuItem className="custom-menu-item" onClick={handleClose}>
                            <Link to="/finder"><i className="fa-solid fa-magnifying-glass"></i>  Buscar</Link>
                        </MenuItem>
                    </>

                )}

                {!store.token ? (
                    <MenuItem className="custom-menu-item" onClick={handleClose}>
                        <Link to="/user-login"><i class="fa-solid fa-arrow-right-to-bracket"></i> Iniciar Sesión</Link>
                    </MenuItem>
                ) : (
                    <MenuItem className="custom-menu-item" onClick={() => { handleClose(); actions.logout(); }}>
                        <Link to="/user-login"><i class="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión</Link>
                    </MenuItem>
                )}
            </Menu>
        </div>
        </div>
    );
};
