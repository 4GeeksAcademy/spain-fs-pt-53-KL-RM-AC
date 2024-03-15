import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/MyProfile.css";
import { Link } from "react-router-dom";
import { CreateProfile } from "./CreateProfile";

export const MyProfile = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true); // Inicialmente, establece loading como true

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true); // Establece loading como true al comenzar la carga
                await actions.getProfile();
                setLoading(false); // Cuando getProfile() ha terminado, establece loading como false
            } catch (error) {
                console.error("Error al obtener perfil:", error);
                setLoading(false); // También establece loading como false en caso de error
            }
        };
    
        fetchProfile();
    }, []); 

    useEffect(() => {
        setUserData(store);
    }, [store]);

    const handleDelete = () => {
        actions.deleteUserProperties();
    };

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
    if (loading) {
        return (
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
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
                                    <Link to={"/edit"}>
                                        <button type="button" className="btn btn-dark m-3">Editar Perfil</button>
                                    </Link>
                                    <Link to={"/homelogged "}>
                                        <button type="button" className="btn btn-dark m-3" onClick={handleDelete}>Eliminar Perfil</button>
                                    </Link>
                                    <Link to={"/password"}>
                                        <button type="button" className="btn btn-dark">Cambiar Contrasena</button>
                                    </Link>
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
