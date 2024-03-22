import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import password from "../../img/Forgot password-bro.png";
import "../../styles/password.css";



export const Password = () => {
    const { store, actions } = useContext(Context);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleChangePassword = async () => {
        try {
            await actions.changePassword(oldPassword, newPassword);
            setAlertMessage("Contraseña cambiada exitosamente");
            // Puedes agregar aquí cualquier otra lógica que desees después de cambiar la contraseña
        } catch (error) {
            setAlertMessage("Error al cambiar la contraseña: " + error.message);
        }
    };

    return (
        <div className="password container mt-5 justify-content-center ">
            <div className="passwordForm col-6">
                <form>
                    <h3 className="title text-center p-3">Cambiar Contraseña</h3>

                    <label htmlFor="inputPassword" className="form-label fw-bold">Contraseña Actual</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        aria-describedby="passwordHelpBlock"
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
                    {alertMessage && (
                        alertMessage === "Contraseña cambiada exitosamente" ? (
                            <div className="alert alert-success mt-3">{alertMessage}</div>
                        ) : (
                            <div className="alert alert-danger mt-3">{alertMessage}</div>
                        )
                    )}
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

export default Password;
