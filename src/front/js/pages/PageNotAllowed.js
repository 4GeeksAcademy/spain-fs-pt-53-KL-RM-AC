import React from "react";
import noData from "../../img/No data-amico.png"
import { Link } from "react-router-dom";
import "../../styles/pageNotAllowed.css";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const PageNotAllowed = () => {

	return (
		<div className="PageNotAllowed container">
			<div className="content">
				<Stack sx={{ width: '50%' }} spacing={2} className="alertPNA">
					<Alert variant="outlined" severity="error">
						Debes <Link to={"/user-signup"} className="link">Registrarte</Link> o <Link to={"/user-login"} className="link">Iniciar sesion</Link> para acceder a esta vista.
					</Alert>
				</Stack>
				<img src={noData} style={{ width: '300px', height: '300px', margin: 'auto' }} />
			</div>
		</div>
	);
};
