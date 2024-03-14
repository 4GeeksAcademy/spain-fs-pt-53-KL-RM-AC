
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
			profile_img: null,
		},
		actions: {
			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				console.log("application just loaded")
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				localStorage.removeItem("token");
				console.log("login out");
				setStore({ token: null });
			},

			login: async (formData) => {
				try {
					const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/token', {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Error log in");
					}
					else if (response.ok) {
						const data = await response.json();
						localStorage.setItem('token', data.access_token);
						console.log('Token:', data.access_token);
					}
				} catch (error) {
					throw error;
				}
			},

			signUp: async (formData) => {
				try {
					const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/signup', {
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
					localStorage.setItem('formData', JSON.stringify(formData));
				} catch (error) {
					throw error;
				}
			},



			getProfile: async () => {
				try {
					const { token } = await getStore()
					const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/user/profile', {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						}
					});
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Usuario no encontrado")
					}
					const userData = await response.json();
					setStore({
						id: userData.id,
						email: userData.email,
						user_name: userData.user_name,
						last_name: userData.last_name,
						pet: userData.properties.pet,
						gender: userData.properties.gender,
						budget: userData.properties.budget,
						find_roomie: userData.properties.find_roomie,
						text_box: userData.properties.text_box,
						profile_img: userData.properties.profile_img
					});

				} catch (error) {
					throw error;
				}
			},
			addProfileInfo: async (formData) => {
				try {
					const { token } = await getStore();
					const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/user/properties', {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Error al crear usuario");
					}
					return response.json(); // Devuelve la respuesta JSON si la solicitud fue exitosa
				} catch (error) {
					throw error;
				}
			},

			updateProfileInfo: async (formData) => {
                try {
                    const { token } = await getStore();
                    const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/user/properties', {
                        method: "PUT",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    });
                    if (!response.ok) {
                        const data = await response.json();
                        throw new Error(data.message || "Error al actualizar las propiedades del usuario");
                    }
                    // Si la solicitud fue exitosa, actualiza el store con los nuevos datos del usuario
                    const userData = await response.json();
                    setStore({
                        pet: userData.pet,
                        gender: userData.gender,
                        budget: userData.budget,
                        find_roomie: userData.find_roomie,
                        text_box: userData.text_box,
                        profile_img: userData.profile_img
                    });
                    return userData; // Devuelve los datos actualizados del usuario
                } catch (error) {
                    throw error;
                }
            },

			deleteUserProperties: async ()=> {
				try {
					const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/user/properties', {
						method: 'DELETE',
						headers: {
							'Authorization': 'Bearer ' + yourJWTToken, // Reemplaza yourJWTToken con el token JWT válido
							'Content-Type': 'application/json'
						}
					});
			
					const responseData = await response.json();
			
					if (!response.ok) {
						throw new Error(responseData.error || 'Failed to delete user properties');
					}
			
					console.log(responseData.message); // Mensaje de éxito en caso de eliminación exitosa
				} catch (error) {
					console.error('Error deleting user properties:', error.message);
			    }
			},


			changePassword: async (newPassword) => {
				try {
					const { token } = await getStore();
					const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/user/change-password', {
						method: "PUT",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ new_password: newPassword })
					});

					if (!response.ok) {
						throw new Error("No se pudo cambiar la contraseña");
					}

					const data = await response.json();
					return data.message;
				} catch (error) {
					throw error;
				}
			},


			getAllUsers: async () => {
				try {

					// Realizar la llamada a la API para obtener todos los usuarios con propiedades
					const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/users/properties');
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Error al crear usuario");
					}
					return response.json(); // Devuelve la respuesta JSON si la solicitud fue exitosa
				} catch (error) {
					throw error;
				}
			},



			getUserById: async (id) => {

				//const token = token,
				// tengo que almacenar los datos del usuario en el store userData:? const [userData, setUserData] = useState(null);
				//  setUserData(userData);

				try {
					const response = await fetch('https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/user/${id}', {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							//habria que añadir aqui el token?
							// "Authorization": `Bearer ${token}`
						},

					});

					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Error al obtener el perfil del usuario");
					}

					const userData = await response.json();

					// Almacena los datos del usuario en el store (usando setUserData)
					setUserData(userData);

					return userData;

				} catch (error) {
					console.error('Error al obtener el perfil del usuario:', error);

					throw error;
				}
			},

		}

	};
};

export default getState;