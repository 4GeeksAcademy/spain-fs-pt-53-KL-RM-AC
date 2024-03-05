import React from "react";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			email: null,
			password: null,
			token: null,
			user_name:null,
			last_name:null,
			pet:null,
			gender:null,
			budget :null,
			find_roomie:null,
			text_box:null,
		},
		actions: {
			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				console.log("application just loaded")
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			SignUp : async (email, password, userName, lastName, setAlertMessage, setEmail, setPassword, setUserName, setLastName) => {
				try {
				  const options = {
					method: "POST",
					headers: {
					  "Content-Type": "application/json"
					},
					body: JSON.stringify({
					  email: email,
					  password: password,
					  user_name: userName,
					  last_name: lastName
					})
				  };
			
				  const response = await fetch("https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/signup", options);
				  const data = await response.json();
			
				  if (data.message === 'Please enter a valid email address') {
					setAlertMessage(
					  <div className="alert alert-warning">
						Por Favor introducir un correo electronico valido
					  </div>
					);
				  } else if (data.message === "Required data is missing") {
					setAlertMessage(
					  <div className="alert alert-warning">
						Faltan Datos
					  </div>
					);
				  } else if (data.message === "The email is already in use") {
					setAlertMessage(
					  <div className="alert alert-warning">
						El Correo Electronico ya existe
					  </div>
					);
				  } else if (data.message === "User created successfully") {
					setAlertMessage(
					  <div className="alert alert-success">
						User creado correctamente
					  </div>
					);
					// Limpiar los campos de entrada después de que se haya creado exitosamente el usuario
					setEmail("");
					setPassword("");
					setUserName("");
					setLastName("");
				  }
				} catch (error) {
				  throw error;
				}
			  },

			getProfile: async () => {}
	}
};

export default getState;
