import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signUp.css";
import { Link } from "react-router-dom";
import signUpImage from "../../img/signUpImage.png";

export const SignUp = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        user_name: "",
        last_name: ""
    });
    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || !formData.user_name || !formData.last_name) {
            setAlertMessage("Todos los campos son obligatorios");
            return;
        }
        try {
            await actions.signUp(formData);
            setAlertMessage("Usuario creado correctamente");
            setFormData({
                email: "",
                password: "",
                user_name: "",
                last_name: ""
            });
        } catch (error) {
            if (error.message === "The email is already in use") {
                setAlertMessage("El correo electrónico ya está en uso");
            } else {
                setAlertMessage("Error al crear el usuario");
                console.error("Error al crear el usuario:", error);
            }
        }
    };

    return (
        <div className="container-fluid signUpStyles">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="container signUp">
                        <form onSubmit={handleSubmit}>
                            <h1 className="title mb-3">Registrate</h1>
                            <div className="textSignUp">
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="user_name" name="user_name" value={formData.user_name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="current-email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" />
                                </div>
                                <div>
                                    <span>¿Ya estás registrado? <Link to="/user-login" className="link">Iniciar Sesión</Link></span>
                                </div>
                            </div>
                            <button type="submit" className="btn button">Registrarse</button>
                            {alertMessage && (
                                alertMessage === "Usuario creado correctamente" ? (
                                    <div className="alert alert-success mt-3">{alertMessage}</div>
                                ) : (
                                    <div className="alert alert-danger mt-3">{alertMessage}</div>
                                )
                            )}
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <img className="signUpImg img-fluid" src={signUpImage} alt="SignUp Image" />
                </div>
            </div>
        </div>
    );
};
