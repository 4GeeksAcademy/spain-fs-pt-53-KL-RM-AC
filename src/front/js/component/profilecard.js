import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const ProfileCard = () => {
    const {store, actions} = useContext(Context);
    const [userData, setUserData] = useState({properties:{}});

    useEffect(() => {
        // Llamar a la acción para obtener todos los usuarios cuando el componente se monta
        actions.getAllUsers();
    }, []);

    useEffect(() => {
        // Actualizar userData cuando cambian los datos de los usuarios
        setUserData({ properties: store.allUsers });
    }, [store.allUsers]);

    return (
        {userData.properties.map(user => (
        <div className="card" style={{ width: "20rem" }}>
            <div className="card-body">
                <div className="card-upper">
                    <img src="https://c0.klipartz.com/pngpicture/527/663/gratis-png-logo-persona-usuario-icono-de-persona-thumbnail.png" className="img-fluid rounded-circle" alt="" />
                </div>
                <hr></hr>
                <div className="card-center d-flex justify-content-around">
                    <h5 className="card-title-name">{userData.properties.pet}</h5>
                    <h5 className="card-title-name">APELLIDO</h5>
                </div>
                <div className="more-data d-flex justify-content-around">
                    <p>ZONA</p>
                    <p>BUDGET</p>
                </div>
                <div className="d-flex p-3 justify-content-between">
                    <div className="d-grid gap-2 d-md-flex">
                    <Link to ="/learnmore">
                    <button type="button" className="btn btn-success">Saber más</button>
                    </Link>
                    </div>
                    <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                        <button
                            //onClick={() => handleLike(props.algo)} con condicional para que el boton sea solid cuando le de click
                            className="btn btn-link text-end text-decoration-none"
                        >
                            
                                <i className="fas fa-heart"></i>
                            
                                <i className="far fa-heart"></i>
            
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ))}
    )
};
