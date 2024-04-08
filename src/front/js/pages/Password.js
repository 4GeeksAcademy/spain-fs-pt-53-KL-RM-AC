import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/password.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAlert from "./Alerts";

export const Password = () => {
    const { store, actions } = useContext(Context);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChangePassword = async () => {
        if (oldPassword.trim() === '' || newPassword.trim() === '') {
            setAlertMessage("Todos los campos son obligatorios");
            setOpen(true);
            return;
        }

        // Validar la nueva contraseña
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            setAlertMessage("La contraseña debe tener al menos 8 caracteres, incluir al menos un número y un carácter especial");
            setOpen(true);
            return;
        }

        try {
            await actions.changePassword(oldPassword, newPassword);
            setAlertMessage("Contraseña cambiada exitosamente");
            setOpen(true);
        } catch (error) {
            setAlertMessage("Error al cambiar la contraseña");
            setOpen(true);
            if (error.message === "La contraseña actual no es correcta") {
                setAlertMessage("La contraseña actual no es correcta");
                setOpen(true);
            }
        }
    };


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="password container">
                <div className="page-wrapper">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-8 col-sm-10 container form">
                            <div className="passwordForm container">
                                <form className="p-3 m-3">
                                    <h3 className="title  mb-4">Cambiar Contraseña</h3>
                                    <div className="mb-2">
                                        <label htmlFor="inputPassword" className="form-label ">Contraseña Actual</label>
                                        <input
                                            type="password"
                                            id="inputPassword"
                                            className="form-control"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            aria-describedby="passwordHelpBlock"
                                        />
                                    </div>
                                    <div className="mb-2 input-container">
                                        <label htmlFor="inputNewPassword" className="form-label">Nueva Contraseña</label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="inputNewPassword"
                                            className="form-control"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            aria-describedby="newPasswordHelpBlock"
                                        />
                                        <button
                                            className="eye"
                                            type="button"
                                            onClick={handleTogglePasswordVisibility}
                                        >
                                            {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                                        </button>
                                        <div id="passwordHelpBlock" className="form-text">
                                            * La contraseña debe tener al menos 8 caracteres, incluir al menos un número y un carácter especial.
                                        </div>
                                    </div>

                                    <Stack direction="row" spacing={2}>
                                        <CustomAlert open={open} onClose={handleClose} message={alertMessage} severity={alertMessage === "Contraseña cambiada exitosamente" ? "success" : "error"} />
                                    </Stack>
                                    <div className="d-flex justify-content-center">
                                        <Button onClick={handleChangePassword} color="primary" variant="outlined" className="button">Cambiar Contraseña</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};


