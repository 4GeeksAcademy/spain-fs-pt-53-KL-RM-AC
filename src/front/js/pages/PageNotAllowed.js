import React from "react";
import noData from "../../img/noData.png"

export const PageNotAllowed = () => {
	
	return (
		<div className="PageNotAllowed mx-auto">
            <img src={noData} style={{width:'500px',height:'500px'}}/>
            <h2>Debes Iniciar sesion para acceder a esta vista</h2>
		</div>
	);
};
