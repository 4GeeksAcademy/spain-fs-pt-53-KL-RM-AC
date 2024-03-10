import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/MyProfile.css";
import { Link } from "react-router-dom";
import { CreateProfile } from "./CreateProfile";

export const MyProfile = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState("");

    useEffect(() => {
        actions.getProfile();
    }, []);

    useEffect(() => {
        setUserData(store);
    }, [store]);

    const hasRequiredFields = () => {
        console.log("UserData:", userData);
        return (
            userData &&
            userData.gender &&
            userData.budget &&
            userData.find_roomie &&
            userData.profile_img &&
            userData.text_box &&
            userData.pet
        );
    };
    

    // Si los datos del perfil aún no se han cargado, muestra un mensaje de carga o un indicador de carga
    if (!userData) {
        return <div>Cargando perfil...</div>;
    }

    return (
        <div className="container mt-2 p-3 justify-content-center">
            {hasRequiredFields() ? (
                <>
                    <h3 className="text-center">Mi Perfil</h3>
                    <div className="card mb-3">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={userData.profile_img} className="img img-fluid rounded-start" alt="Profile" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{userData.user_name} {userData.last_name}</h5>
                                    <p className="card-text m-1">Email: {userData.email}</p>
                                    <p className="card-text m-1">Genero: {userData.gender}</p>
                                    <p className="card-text m-1">Que es lo que buscas? {userData.find_roomie}</p>
                                    <p className="card-text m-1">Tienes mascota? {userData.pet}</p>
                                    <p className="card-text m-1">Cual es tu presupuesto? {userData.budget}</p>
                                    <p className="card-text m-1">Por que serias el compi ideal? {userData.text_box}</p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark">Editar Perfil</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <CreateProfile />
            )}
        </div>
    );
};

