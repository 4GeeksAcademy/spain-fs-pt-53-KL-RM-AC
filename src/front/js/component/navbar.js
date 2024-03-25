import React, { useContext } from "react";
import { Link } from "react-router-dom";
import compis6 from "../../img/compis6.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { FadeMenu } from "./FadeMenu";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { Button } from "@mui/material";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const { favoriteProfiles } = store;
    const token = store.token;
    const color = red[900];


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
            <div className="favoritos">
                {token && (
                    <div className="dropdown">
                        <IconButton type="button" className="btn btn-primary position-relative" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" aria-expanded="false">
                            <FavoriteIcon />
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
            <FadeMenu />
        </div>

    );
};
