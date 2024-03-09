import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const HomeLogged = () => {
    return (
        <div className="container p-5 mt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h2>Bienvenido a la comunidad</h2>
                </div>
            </div>


            <div className="col-12 d-flex justify-content-center">
                <Link to="/finder">
                    <button type="button" className="btn btn-success mx-2">Buscar</button>
                </Link>

                <Link to="/create">
                    <button type="button" className="btn btn-success mx-2">Mi perfil</button>
                </Link>
            </div>

        </div>
    );
};