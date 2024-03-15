import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useLocation } from "react-router-dom";
import "../../styles/learnmore.css";

export const LearnMore = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState({});
    const [showEmail, setShowEmail] = useState(false);
    const location = useLocation();
   

    useEffect(() => {
        setUserData(location.state.user)
        // Llamar a la acción para obtener la información del usuario por ID
        //actions.getUserById(id, setUserData)
    }, [])

    const handleClickContactar = () => {
        setShowEmail(true);
    };

    return (
        
        <div className="container p-4">
            {userData && (
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center">
                            <img
                                src="https://c0.klipartz.com/pngpicture/527/663/gratis-png-logo-persona-usuario-icono-de-persona-thumbnail.png"
                                className="img-fluid rounded-circle"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-12 mx-auto text-center">
                            <h2>Perfil de Usuario</h2>
                            <p>
                                <strong>Nombre: </strong> {userData.user_name}
                            </p>

                            <p>
                                <strong>Apellidos: </strong> {userData.last_name}
                            </p>

                            <p>
                                <strong>Información Adicional:</strong> {userData.additionalInfo}
                            </p>

                            <p>
                                <strong>Filtros:</strong> Filtros
                            </p>

                            {showEmail && (
                                <p>
                                    <strong>Email:</strong> {userData.email}
                                </p>
                            )}
                        </div>
                        <div className="d-flex p-3 justify-content-center">
                            <div className="d-grid gap-2 d-md-flex">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleClickContactar}
                                >
                                    Contactar
                                </button>
                            </div>
                            <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                                <button
                                    //onClick={() => handleLike(props.algo)} con condicional para que el botón sea sólido cuando le des click
                                    className="btn btn-link text-end text-decoration-none"
                                >
                                    <i className="fas fa-heart"></i>
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};