import React, { useState } from 'react';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			email: null,
			password: null,
			token: null,
			user_name: null,
			last_name: null,
			pet: null,
			gender: null,
			budget: null,
			find_roomie: null,
			text_box: null,
		},
		actions: {
			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				console.log("application just loaded")
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			SignUp = async (formData) => {
				try {
					const response = await fetch("https://tu-api.com/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Error al registrar usuario");
					}
				} catch (error) {
					throw error;
				}
			};
			
			const actions = {
				signUp
			};
			
			export default actions;
			
        }

			https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/signup
		}
	};
};

export default getState;
