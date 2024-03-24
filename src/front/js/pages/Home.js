import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Home = () => {
    const { store, actions } = useContext(Context);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#295f72',
            },
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <div className="home">
                <video autoPlay loop muted className="video-background">
                    <source src="https://videocdn.cdnpk.net/excite/content/video/premium/partners0322/large_preview/103280_C0020_A.mp4?filename=5079165_watch_television_tv_1920x1080.mp4" type="video/mp4" />
                </video>
                <div className="overlay"></div>
                <div className="formulario-bienvenida">
                    <h2>Sabemos lo difícil que es encontrar un compi de piso ideal</h2>
                    <div className="textHome">
                        <p>Por eso hemos creado una web donde podrás encontrar al compi que más encaje contigo</p>
                    </div>
                    <div className="buttonHome">
                        <Link to={"/user-signup"}>
                            <Button color="primary" variant="contained" className="button"><i className="fa-solid fa-magnifying-glass p-2"></i>Buscar compi</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
