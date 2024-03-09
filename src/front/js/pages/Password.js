import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import password from "../../img/Forgot password-bro.png";
import "../../styles/FormsImgs.css";

export const Password = () => {
    const { store, actions } = useContext(Context);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePassword = async () => {
        try {
            await actions.changePassword(oldPassword, newPassword);
            // Si el cambio de contraseña es exitoso, puedes hacer algo aquí, como mostrar un mensaje de éxito
            <div className="alert alert-success" role="alert">
               Contraseña cambiada exitosamente
            </div>
            console.log("Contraseña cambiada exitosamente");
        } catch (error) {
            // Manejar errores, como mostrar un mensaje de error al usuario
            console.error("Error al cambiar la contraseña:", error.message);
        }
    };

    return (
        <div className="container mt-5 p-3 justify-content-center">
            <div className="col-6">
                <form>
                    <h3 className="text-center">Cambiar Contraseña</h3>
                    <label htmlFor="inputOldPassword" className="form-label fw-bold">Contraseña Antigua</label>
                    <input
                        type="password"
                        id="inputOldPassword"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        aria-describedby="oldPasswordHelpBlock"
                    />
                    <label htmlFor="inputNewPassword" className="form-label fw-bold mt-3">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="inputNewPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        aria-describedby="newPasswordHelpBlock"
                    />
                    <div id="passwordHelpBlock" className="form-text text-white text-opacity-50">
                        Tu contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no debe contener espacios, caracteres especiales o emoji.
                    </div>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <button type="button" className="btn btn-dark" onClick={handleChangePassword}>Cambiar Contraseña</button>
                    </div>
                </form>
            </div>
            <div className="possition-relative">
                <img src={password} className="passwordImg position-absolute bottom-0 end-0" alt="Password Img"></img>
            </div>
        </div>
    );
};
