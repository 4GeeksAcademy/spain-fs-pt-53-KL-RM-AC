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
            <div className="container p-3 mt-5 logged">
                <div>
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <div className="text-center">
                            <div className="container title">
                                <h2 className="title">Bienvenido a la comunidad</h2>
                            </div>
                            <div className="d-flex justify-content-center justify-content-md-start">
                                <div className="container conectionImg">
                                    <img src={OnlineWorld} className="onlineWorld" alt="Online World" />
                                </div>
                                <p className="textLogged">"Desde nuestra plataforma, conectamos a más de 1000 personas que encuentran la habitación ideal para convivir felices y crear recuerdos inolvidables."</p>
                            </div>
                            <Stack direction="row" spacing={2}>
                            <div className="container d-flex justify-content-center justify-content-md-start mt-5">
                                <Link to="/finder">
                                    <Button color="primary" variant="outlined" className="button mx-3 mx-md-5"><i className="fa-solid fa-magnifying-glass m-1"></i> Buscar</Button>
                                </Link>
                                <Link to="/profile">
                                    <Button color="primary" variant="outlined" className="button mx-3 mx-md-5"><i className="fa-regular fa-user m-1"></i> Mi perfil</Button>
                                </Link>
                            </div>
                            </Stack>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="container profiles text-center justify-content-md-center">
                            <img src="https://tecnosoluciones.com/wp-content/uploads/2023/07/roles-de-usuarios-en-portales-cms-y-comercio-electronico.png" className="profilesImg img-fluid" alt="Profiles" />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </ThemeProvider>
    );
};
