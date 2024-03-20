import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/MyProfile.css";
import { Link } from "react-router-dom";
import { CreateProfile } from "./CreateProfile";
import { PageNotAllowed } from "./PageNotAllowed";

const LITERALS = {
    "Male": "Hombre",
    "Female": "Mujer",
    "Yes": "Tengo mascota",
    "No": "No tengo mascota",
    "Apartment": "Busco rommie",
    "NoApartment": "Busco habitación",
}

export const MyProfile = () => {
    const { store, actions } = useContext(Context);
    const userData = {
        user_name: store.user_name,
        last_name: store.last_name,
        pet: store.pet,
        gender: store.gender,
        email: store.email,
        budget: store.budget,
        find_roomie: store.find_roomie,
        text_box: store.text_box,
        profile_img: store.profile_img,
    };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                await actions.getProfile();
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener perfil:", error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);
    console.log(userData)

    const handleDelete = () => {
        actions.deleteUserProperties();
    };

    const hasRequiredFields = () => {
        return (
            userData.pet !== null && userData.pet !== "" &&
            userData.gender !== null && userData.gender !== "" &&
            userData.budget !== null && userData.budget !== "" &&
            userData.find_roomie !== null && userData.find_roomie !== "" &&
            userData.text_box !== null && userData.text_box !== "" &&
            userData.profile_img !== null && userData.profile_img !== ""
        );
    };

    if (!store.token || store.token === "" || store.token === undefined) {
        return <PageNotAllowed />;
    } else if (loading ) {
        return (
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Cargando...</span>
            </div>
        );
    } else if (!hasRequiredFields()) {
        return (
            <div>
                <CreateProfile />
            </div>
        );
    } else {

        return (
            <div className="nuevo">
                <div className="container myprofile mt-4 p-3 justify-content-center">
                    <div className="postal-myprofile">
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-center align-items-center pb-3">
                                <img src={userData.profile_img} className="profile-image img-fluid rounded-circle" alt="Profile" style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-6 user-info">
                                <h2 className="text-center">Mi Perfil</h2>
                                <hr />
                                <p><strong>Nombre:</strong> {userData.user_name} {userData.last_name}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><i className="fa-solid fa-venus-mars"></i><strong> Género:</strong> {LITERALS[userData.gender]}</p>
                                <p><i className="fa-solid fa-paw"></i><strong> Tienes mascota:</strong> {LITERALS[userData.pet]}</p>
                                <p><i className="fa-solid fa-euro-sign"></i><strong> Presupuesto:</strong> {userData.budget}</p>
                                <p><strong>¿Qúe buscas?:</strong> {LITERALS[userData.find_roomie]}</p>
                                <p><strong>¿Por qué serías el compañero ideal?</strong></p>
                                <div className="ideal-companion">
                                    <p>{userData.text_box}</p>
                                </div>
                                <div className="custom-btn d-flex justify-content-center">
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
                </div>

            </div>
        );
    }
};