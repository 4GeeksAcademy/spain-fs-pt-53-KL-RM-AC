import React, { useContext } from "react";
import { Link } from "react-router-dom";
import compislogo from "../../img/compis.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { FadeMenu } from "./FadeMenu";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const { favoriteProfiles } = store;
    const token = store.token;

    return (
        <div className="d-flex custom-navbar">
            <div className="logo me-auto">
                {token ? (
                    <Link to="/homelogged">
                        <img className="navbar-brand imageLogo" src={compislogo} alt="" />
                    </Link>
                ) : (
                    <Link  to="/">
                    <img className="navbar-brand imageLogo" src={compislogo} alt="" />
                    </Link>
                )}
            </div>
            <div className="favoritos">
                {token && (
                    <div className="dropdown">
                        <button className="btn btn-warning " type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-heart"></i> ({favoriteProfiles.length})
                        </button>
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