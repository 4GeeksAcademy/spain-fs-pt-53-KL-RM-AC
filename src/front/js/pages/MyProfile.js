import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ProfileImg from "../../img/Curly hair-pana.png";
import "../../styles/MyProfile.css";

export const MyProfile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProfile();
    }, []);

    const { user_name, last_name, email, userProperties } = store;

    return (
        <div className="container mt-2 p-3 justify-content-center">
            <h3 className="text-center">Mi Perfil</h3>
            <div className="card mb-3">
                <div className="row">
                    <div className="col-md-4">
                        <img src={ProfileImg} className="img img-fluid rounded-start" alt="Profile" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{user_name} {last_name}</h5>
                            <p className="card-text m-1">Email: {email}</p>
                            {userProperties && (
                                <>
                                    <p className="card-text m-1">Genero: {userProperties.properties.gender}</p>
                                    <p className="card-text m-1">Que es lo que buscas? {userProperties.properties.find_roomie}</p>
                                    <p className="card-text m-1">Tienes mascota? {userProperties.properties.pet}</p>
                                    <p className="card-text m-1">Cual es tu presupuesto? {userProperties.properties.amount}</p>
                                    <p className="card-text m-1">Por que serias el compi ideal? {userProperties.properties.text_box}</p>
                                </>
                            )}
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-dark">Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
