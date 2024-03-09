
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
			favoriteProfiles: null,
			
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
					const response = await fetch(process.env.BACKEND_URL + '/token', {
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
					const response = await fetch(process.env.BACKEND_URL + '/signup', {
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
				
					const response = await fetch(process.env.BACKEND_URL + '/user/profile', {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						}
					});
					console.log(response)
					if (!response.ok) {
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
						budget: userData.properties.amount,
						find_roomie: userData.properties.find_roomie,
						text_box: userData.properties.text_box,
						profile_img: userData.properties.profile_img
					});

				} catch (error) {
					throw error;
				}
			},

			getAllUsers: async () => {
				const { token } = await getStore()
				try {
					// Realizar la llamada a la API para obtener todos los usuarios con propiedades
					const response = await fetch(process.env.BACKEND_URL + '/users/properties', {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
					}

					const data = await response.json();
			
					setStore({ allUsers: data });
					console.log(data)
					return data;

				} catch (error) {
					console.error('Error al obtener usuarios:', error);

					return { error: 'Error al obtener usuarios' };

				}
			},

			getUserById: async (id, setUserData) => {
		
				try {
					const token = store.token
					const response = await fetch(process.env.BACKEND_URL + `/user/${id}`, {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token,
						},

					});

					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Error al obtener el perfil del usuario");
					}

					const userData = await response.json();
					
					setUserData({
						id: userData.id,
						email: userData.email,
						user_name: userData.user_name,
						last_name: userData.last_name,
						pet: userData.properties.pet,
						gender: userData.properties.gender,
						budget: userData.properties.amount,
						find_roomie: userData.properties.find_roomie,
						text_box: userData.properties.text_box,
						profile_img: userData.properties.profile_img
					});

				} catch (error) {
					console.error('Error al obtener el perfil del usuario:', error);
					throw error;
				}
			},

			//para añadir los favoritos mediante el ID del perfil del usuario
			addFavoriteProfile: async  (profileId) => {
				const { token } = await getStore()
				try {
					
					const response = await fetch(process.env.BACKEND_URL + '/user/favorite-profiles', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							"Authorization": "Bearer " + token,
		
						},
						body: JSON.stringify({ profile_id: profileId })
						
					});
					
			
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.error || 'Error al agregar a favoritos');
					}
			
					return true; // Otra respuesta según lo que necesites
				} catch (error) {
					console.error('Error al agregar a favoritos:', error);
					throw error;
				}
			},

			
			//traer los favoritos al que usuario le ha dado like
			getFavoriteProfiles: async () => {
				const { token } = await getStore()
				try {
					const response = await fetch(process.env.BACKEND_URL + '/user/favorite-profiles', {
						method: 'GET',
						headers: {
							"Authorization": "Bearer " + token,
						}
					});
			
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.error || 'Error al obtener perfiles favoritos');
					}
			
					const favoriteProfiles = await response.json();
					return favoriteProfiles;
				} catch (error) {
					console.error('Error al obtener perfiles favoritos:', error);
					throw error;
				}
			},

			//aquí falta poner la action de borrar los favoritos que lo haré más adelante
			// removeFavoriteProfile: async (profileId) => {
			// 	const { token } = await getStore()
			// 	try {
			// 		const response = await fetch(process.env.BACKEND_URL + `/user/favorite-profiles/${profileId}`, {
			// 			method: 'DELETE',
			// 			headers: {
			// 				"Authorization": "Bearer " + token,
			// 			}
			// 		});
			
			// 		if (!response.ok) {
			// 			const data = await response.json();
			// 			throw new Error(data.error || 'Error al eliminar el perfil de favoritos');
			// 		}
			
			// 		console.log(true)
			// 		return true; // Indica que la eliminación fue exitosa
			// 	} catch (error) {
			// 		console.error('Error al eliminar el perfil de favoritos:', error);
			// 		throw error;
			// 	}
			// },

			getUsersFilter: async (filters) => {
				const { token } = await getStore()
				try {
					// Convierte los filtros a una cadena de consulta
					const queryString = new URLSearchParams(filters).toString();
			
					// Realiza la solicitud GET a la ruta del servidor con la cadena de consulta
					const response = await fetch(`${process.env.BACKEND_URL}/users-filter?${queryString}`, {
						method: 'GET',
						headers: {
							"Authorization": "Bearer " + token,
						}
					});
			
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.error || 'Error al obtener usuarios filtrados');
					}
			
					const filteredUsers = await response.json();
					return filteredUsers;
				} catch (error) {
					console.error('Error al obtener usuarios filtrados:', error);
					throw error;
				}
			},

		}

	};
};

export default getState;