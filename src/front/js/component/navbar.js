import React, { useContext } from "react";
import { Link } from "react-router-dom";
import compislogo from "../../img/compis.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { FadeMenu } from "./FadeMenu";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const { favoriteProfiles } = store;
    const token = store.token;
    const [value, setValue] = React.useState('recents');
    const color = red[900];

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: 4,
          top: 9,
          padding: '2px 4px',
          fontSize: '0.65rem',
          fontWeight: 'bold',
          backgroundColor: color,
          minWidth: '10px', // Reducir el ancho mínimo del círculo
          height: '14px', // Reducir la altura del círculo
          width: '14px',
     
        },
      }));

    return (
        <div className="d-flex custom-navbar">
            <div className="logo me-auto">
                {token ? (
                    <Link to="/homelogged">
                        <img className="navbar-brand imageLogo" src={compislogo} alt="" />
                    </Link>
                ) : (
                    <Link to="/">
                        <img className="navbar-brand imageLogo" src={compislogo} alt="" />
                    </Link>
                )}
            </div>
            <div className="favoritos">
                {token && (
                    <div className="dropdown">

                        {/* <IconButton aria-label="Favorite">
                                <FavoriteIcon /> ({favoriteProfiles.length})
                            </IconButton> */}
                        <IconButton type="button" className="btn btn-primary position-relative" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" aria-expanded="false">
                        <FavoriteIcon />
                        <StyledBadge badgeContent={favoriteProfiles.length} color="red"></StyledBadge>
                        </IconButton>
                        {/* <button className="btn btn-warning " type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-heart"></i> ({favoriteProfiles.length})
                        </button> */}
                        <ul className="dropdown-menu m-2" aria-labelledby="dropdownMenuClickableInside">
                            {favoriteProfiles.map(profile => (
                                <li key={profile.id}>
                                    <Link to={`/learnmore/${profile.id}`}>
                                        <p>
                                            {profile.user_name} {profile.last_name}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <FadeMenu />
        </div>
    );
};