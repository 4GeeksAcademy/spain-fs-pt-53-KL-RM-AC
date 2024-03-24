import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
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
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}

            >
                <i class=" icon fa-solid fa-bars fa-xl"></i>
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
                <MenuItem className="custom-menu-item" onClick={handleClose}> {/* Aplica la clase CSS personalizada al elemento MenuItem */}
                    <Link to="/profile"><i className="fa-regular fa-user"></i> Mi perfil</Link> {/* Envuelve el enlace dentro del elemento MenuItem */}
                </MenuItem>
                <MenuItem className="custom-menu-item" onClick={handleClose}>
                    <Link to="/finder"><i className="fa-solid fa-magnifying-glass"></i>  Buscar</Link>
                </MenuItem>

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
    );
};
