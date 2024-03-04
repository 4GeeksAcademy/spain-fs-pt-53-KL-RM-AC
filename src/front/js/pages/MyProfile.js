import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import ProfileImg from "../../img/Curly hair-pana.png";
import "../../styles/MyProfile.css";

export const MyProfile = () => {
    const { store, actions } = useContext(Context);
    const [editing, setEditing] = useState(false); // Estado para controlar si se está editando o no
    const [userData, setUserData] = useState({
        email: "ejemplo@gmail.com",
        genero: "Femenino",
        busqueda: "Tengo piso busco roomie",
        mascota: "Si",
        presupuesto: "Hasta 300",
        ubicacion: "Madrid",
        compiIdeal: "Mucho texto"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelClick = () => {
        setEditing(false);
        // Si deseas, aquí podrías reiniciar los datos editables a los originales
    };

    const handleSaveClick = () => {
        // Aquí puedes agregar la lógica para guardar los datos editados
        // Puedes llamar a una función de tu contexto para ello, por ejemplo:
        // actions.actualizarPerfil(userData);
        setEditing(false);
    };

    return (
        <div className=" container mt-2 p-3 justify-content-center">
            <h3 className="text-center">Mi Perfil</h3>
            <div className="card mb-3">
                <div className="row">
                    <div className="col-md-4">
                        <img src={ProfileImg} className="img img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Rocio Santos</h5>
                            {editing ? (
                                <>
                                    <input type="text" name="email" value={userData.email} onChange={handleInputChange} />
                                    <input type="text" name="genero" value={userData.genero} onChange={handleInputChange} />
                                    <select className="form-select " aria-label="Default select example">
                                        <option selected>Que buscas?</option>
                                        <option value="1"> Tengo piso y busco roomie</option>
                                        <option value="2">Busco roomie con piso</option>
                                    </select>

                                    <input type="text" name="busqueda" value={userData.busqueda} onChange={handleInputChange} />
                                    <input type="text" name="mascota" value={userData.mascota} onChange={handleInputChange} />
                                    <input type="text" name="presupuesto" value={userData.presupuesto} onChange={handleInputChange} />
                                    <input type="text" name="ubicacion" value={userData.ubicacion} onChange={handleInputChange} />
                                    <input type="text" name="compiIdeal" value={userData.compiIdeal} onChange={handleInputChange} />
                                </>
                            ) : (
                                <>
                                    <p className="card-text m-1">Email: {userData.email}</p>
                                    <p className="card-text m-1">Genero: {userData.genero}</p>
                                    <p className="card-text m-1">Que es lo que buscas? {userData.busqueda} </p>
                                    <p className="card-text m-1">Tienes mascota? {userData.mascota} </p>
                                    <p className="card-text m-1">Cual es tu presupuesto? {userData.presupuesto} </p>
                                    <p className="card-text m-1">Ubicacion: {userData.ubicacion} </p>
                                    <p className="card-text m-1">Por que serias el compi ideal? {userData.compiIdeal} </p>
                                </>
                            )}
                        </div>
                        <div className="d-flex justify-content-center">
                            {editing ? (
                                <>
                                    <button type="button" className="btn btn-dark me-2" onClick={handleSaveClick}>Guardar</button>
                                    <button type="button" className="btn btn-dark" onClick={handleCancelClick}>Cancelar</button>
                                </>
                            ) : (
                                <button type="button" className="btn btn-dark" onClick={handleEditClick}>Editar Perfil</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
