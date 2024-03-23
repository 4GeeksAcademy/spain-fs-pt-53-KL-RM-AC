import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomAlert from "./Alerts";




export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [alertMessage, setAlertMessage] = useState("");
    const [open, setOpen] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setAlertMessage("Todos los campos son obligatorios");
            setOpen(true)
            return;
        }
        try {
            await actions.login(formData);
            setFormData({
                email: "",
                password: ""
            });
            navigate("/homelogged");
        } catch (error) {
            if (error.message === "Email or password are incorrect")
                setAlertMessage("Correo electrónico o contraseña incorrectos");
                setOpen(true)

        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
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
            <div className="container-fluid loginStyles">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        <div className="container textLogin login mx-auto">
                            <form onSubmit={handleSubmit} className="p-3 m-3">
                                <h1 className="title mb-4">Iniciar Sesion</h1>
                                <div className="mb-2">
                                    <label className="form-label">Correo</label>
                                    <input type="email" className="input form-control" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="current-user_name" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Contraseña</label>
                                    <input type="password" className="input form-control" id="password" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" />
                                </div>
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={handleSubmit} type="submit" color="primary" variant="outlined" className="button">Continuar</Button>
                                    <CustomAlert open={open} onClose={handleClose} message={alertMessage} severity={"error"} />
                                </Stack>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>

    );
};
