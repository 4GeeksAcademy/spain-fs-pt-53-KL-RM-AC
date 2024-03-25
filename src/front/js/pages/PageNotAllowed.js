import React from "react";
import noData from "../../img/No data-amico.png"
import { Link } from "react-router-dom";
import "../../styles/pageNotAllowed.css";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const PageNotAllowed = () => {

	return (
		<div className="PageNotAllowed container">

			<div className="content row col-12">
				<Stack sx={{ width: '50%' }} spacing={2} className="alertPNA" justifyContent="center" alignItems="center" >
					<Alert variant="outlined" severity="error" justifyContent="center" alignItems="center" >
						Debes <Link to={"/user-signup"} className="link">Registrarte</Link> o <Link to={"/user-login"} className="link">Iniciar sesion</Link> para acceder a esta vista.
					</Alert>
				</Stack>
			</div>
			<div className="content row col-12">

				<img src={noData} style={{ width: '500px', height: '500px', margin: 'auto' }} />
			</div>
		</div>
	);
};
