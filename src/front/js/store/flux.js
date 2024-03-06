import React from "react";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			email: null,
			password: null,
			token: null,
			user_name:null,
			last_name:null,
			userProperties: null
			// pet:null,
			// gender:null,
			// budget :null,
			// find_roomie:null,
			// text_box:null,
		},
		actions: {
			getProfile: async () => {
				try {
					const response = await fetch("https://glowing-cod-x5vgjg7x9gqhp79g-3001.app.github.dev/api/users/profile", {
						method: "GET",
						headers: {
							"Authoritation": "Bearer " + token,
							"Content-Type": "application/json"
						}
					});
					if (!response.ok){
						throw new Error(data.message||"Usuario no encontrado")
					}
					const userProperties = await response.json();
					setStore({userProperties: userProperties})
					
			} catch (error)	{
				throw error;
			}
		},
	}
};
};

export default getState;
