import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useLocation } from "react-router-dom";
import "../../styles/learnmore.css";
const LITERALS = {
    "Male": "Hombre",
    "Female": "Mujer",
    "Yes": "Tengo mascota",
    "No": "No tengo mascota",
    "Apartment": "Busco rommie",
    "NoApartment": "Busco habitación",
}

export const LearnMore = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState({});
    const [showEmail, setShowEmail] = useState(false);
    const location = useLocation();
   
    useEffect(() => {
        setUserData(location.state.user);
        // Llamar a la acción para obtener la información del usuario por ID
        //actions.getUserById(id, setUserData)
    }, []);

    const handleClickContactar = () => {
        setShowEmail(true);
    };

    return (
        <div className="container-fluid learnmore p-4 postal">
            {userData && (
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center">
                            <img src={userData.properties?.profile_img} className="profile-image rounded-start" alt="Profile" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="user-info">
                            <h2 className="text-center">Perfil de Usuario</h2>
                            <hr></hr>
                            <div className="row">
                                <div className="col-md-6">
                                    <p> <i className="fas fa-user"></i><strong> Nombre: </strong> {userData.user_name}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Apellidos: </strong> {userData.last_name}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-6">
                                    <p><i className="fa-solid fa-paw"></i> {LITERALS[userData.properties?.pet]}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><i className="fa-solid fa-venus-mars"></i> {LITERALS[userData.properties?.gender]}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Presupuesto:</strong> {userData.properties?.budget}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Situación actual:</strong> {LITERALS[userData.properties?.find_roomie]}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-12">
                                        <p><strong>¿Por qué eres el compi ideal?</strong></p>
                                    <div className="ideal-companion">
                                        <p>{userData.properties?.text_box}</p>
                                    </div>
                                </div>
                            </div>
                            {showEmail && (
                                <div className="row">
                                    <div className="col-md-12">
                                        <p><strong>Email:</strong> {userData.email}</p>
                                    </div>
                                </div>
                            )}
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleClickContactar}
                                    >
                                        Contactar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};