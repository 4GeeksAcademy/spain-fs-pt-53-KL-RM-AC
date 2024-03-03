import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LearnMore = () => {
    const profileInfo = {
        name: "John",
        surname: "Doe Smith",
        email: "john@example.com",
        additionalInfo: "Información adicional sobre el usuario.",
    };

    const [showEmail, setShowEmail] = useState(false);

    const handleClickContactar = () => {
        setShowEmail(true);
    };

    return (
        <div className="container p-4">
            <div className="d-flex justify-content-center">
                <img
                    src="https://c0.klipartz.com/pngpicture/527/663/gratis-png-logo-persona-usuario-icono-de-persona-thumbnail.png"
                    className="img-fluid rounded-circle"
                    alt=""
                />
            </div>
            <hr />

            <div className="col-md-6 mx-auto text-center">
                <h2>Perfil de Usuario</h2>
                <p>
                    <strong>Nombre: </strong> {profileInfo.name}
                </p>

                <p>
                    <strong>Apellidos: </strong> {profileInfo.surname}
                </p>

                <p>
                    <strong>Información Adicional:</strong> {profileInfo.additionalInfo}
                </p>

                <p>
                    <strong>Filtros:</strong> Filtros
                </p>

                {showEmail && (
                    <p>
                        <strong>Email:</strong> {profileInfo.email}
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
                        //onClick={() => handleLike(props.algo)} con condicional para que el boton sea solid cuando le de click
                        className="btn btn-link text-end text-decoration-none"
                    >
                        <i className="fas fa-heart"></i>
                        <i className="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};