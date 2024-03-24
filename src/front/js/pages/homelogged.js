import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/homelogged.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const HomeLogged = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="containe logged">
                <div>
                    <div className="row">
                        <div >
                            <div className="text-center">
                                <div className="container title">
                                    <h2 className="title">Bienvenido a la comunidad</h2>
                                </div>
                                <div className="box justify-content-center justify-content-md-start">
                                    <p className="textLogged">"Desde nuestra plataforma, conectamos a más de 1000 personas que encuentran la habitación ideal para convivir felices y crear recuerdos inolvidables."</p>
                                </div>
                                    <div className="container d-flex justify-content-center  mt-5">
                                        <Link to="/finder">
                                        <Button color="primary" variant="contained" className="button"><i className="fa-solid fa-magnifying-glass m-1"></i> Buscar</Button>
                                        </Link>
                                        <Link to="/profile">
                                        <Button color="primary" variant="contained" className="button"><i className="fa-regular fa-user m-1"></i> Mi perfil</Button>
                                        </Link>
                                    </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};
