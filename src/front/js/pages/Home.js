import React, { useContext } from "react";
import { Context } from "../store/appContext";
import HangOut from "../../img/Hang out-cuate.png"
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

			<div className="row home justify-content-center">
				<div>
					<div className="d-flex m-0 ">
						<p className="title">COMPIS</p>
						<p className="subtitle">APP</p>
					</div>
					{/* <div className="possition-relative">
						<img src={HangOut} className="hangoutImg position-absolute bottom-0 "></img>
					</div> */}

				</div>
				<div className="col-5">
					<div className="container ">
						<p className="textHome p-2">
							Sabemos lo dificil que es encontrar a tu match...pero estamos aquí para ayudarte a encontrar a tu compi de piso perfecto.
						</p>
					</div>
					<div className="text-center">
						<p className="question">
							¿Quieres unirte a la comunidad?
						</p>
					 

					</div>


				</div>
			</div>
		</ThemeProvider>
	);
};
