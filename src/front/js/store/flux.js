
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
			allUsers: [],
			favoriteProfiles: [],

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

				setStore({
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
					favoriteProfiles: [],
				});


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
						setStore({ token: data.access_token });
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
				const { token } = await getStore()
					const response = await fetch(process.env.BACKEND_URL + '/user/profile', {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						}
					});
					try {
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Error al obtener el perfil del usuario")
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
					console.log(userData)

				 }catch (error) {
					throw new Error("Error al obtener el perfil del usuario: " + error.message);
				}
			},
			addProfileInfo: async (formData) => {
				const { token } = await getStore();

				try {
					console.log(formData)
					const response = await fetch(process.env.BACKEND_URL + '/user/properties', {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});
					console.log(response)
					if (!response.ok) {
						const data = await response.json();
						throw new Error(data.message || "Error al crear usuario");
					}
					return response.json(); // Devuelve la respuesta JSON si la solicitud fue exitosa
				} catch (error) {
					console.log("error")
				}
			},

			updateProfileInfo: async (formData) => {
				const { token } = await getStore();

				try {
					const response = await fetch(process.env.BACKEND_URL + '/user/properties', {
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

			deleteUserProperties: async () => {
				const { token } = await getStore();

				try {
					const response = await fetch(process.env.BACKEND_URL + '/user/properties', {
						method: 'DELETE',
						headers: {
							'Authorization': 'Bearer ' + token, //t Reemplaza yourJWTToken con el token JWT válido
							'Content-Type': 'application/json'
						}
					});

					const responseData = await response.json();

					if (!response.ok) {
						throw new Error(responseData.error || 'Failed to delete user properties');
					}

					console.log(responseData.message); 
					setStore({
						...getStore(),
						pet: null,
						gender: null,
						budget: null,
						find_roomie: null,
						text_box: null,
						profile_img: null
						// Actualiza cualquier otra propiedad que necesite ser restablecida
					});// Mensaje de éxito en caso de eliminación exitosa
				} catch (error) {
					console.error('Error deleting user properties:', error.message);
				}
			},



			changePassword: async (oldPassword, newPassword) => {
				const { token } = await getStore();

				try {
					const { token } = await getStore();
					const response = await fetch(process.env.BACKEND_URL + '/change/password', {
						method: "PUT",
						headers: {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
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
				const { token } = await getStore()

				if (!token) {
					console.error('Token no disponible. Inicia sesión nuevamente.');
					return [];
				}

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



			getUserById: async (id) => {

				//const token = token,
				// tengo que almacenar los datos del usuario en el store userData:? const [userData, setUserData] = useState(null);
				//  setUserData(userData);

				try {
					const response = await fetch(process.env.BACKEND_URL + ' /user/${id}', {
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

			//traer los favoritos al que usuario le ha dado like
			getFavoriteProfiles: async () => {
				const { token } = await getStore();

				if (!token) {
					console.error('Token no disponible. Inicia sesión nuevamente.');
					return [];
				}

				try {
					const response = await fetch(process.env.BACKEND_URL + '/user/favorite/profiles', {
						method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + token,
							'Content-Type': 'application/json',
						},
					});

					if (!response.ok) {
						throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
					}

					const data = await response.json();
					return data;
				} catch (error) {
					console.error('Error al obtener perfiles favoritos:', error);
					return [];
				}
			},

			//para añadir los favoritos mediante el ID del perfil del usuario
			addFavoriteProfile: async (profileId) => {
				const { token } = await getStore();
				const actions = getActions();
				try {
					const response = await fetch(process.env.BACKEND_URL + '/user/favorite/profiles', {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer ' + token,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ profile_id: profileId }),
					});

					if (!response.ok) {
						throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
					}

					// Obtener la lista actualizada de perfiles favoritos después de agregar uno nuevo
					const updatedFavoriteProfiles = await actions.getFavoriteProfiles();

					setStore({ favoriteProfiles: updatedFavoriteProfiles });
					return true;
				} catch (error) {
					console.error('Error al agregar a favoritos:', error);
					return false;
				}
			},


			//borrar perfiles a los que ha dado like
			removeFavoriteProfile: async (profileId) => {
				const { token } = await getStore();
				const actions = getActions();
				try {
					const response = await fetch(process.env.BACKEND_URL + `/user/favorite/profiles/${profileId}`, {
						method: 'DELETE',
						headers: {
							'Authorization': 'Bearer ' + token,
							'Content-Type': 'application/json',
						},
					});

					if (!response.ok) {
						throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
					}

					// Obtener la lista actualizada de perfiles favoritos después de eliminar uno
					const updatedFavoriteProfiles = await actions.getFavoriteProfiles();

					setStore({ favoriteProfiles: updatedFavoriteProfiles });
					return true;
				} catch (error) {
					console.error('Error al eliminar de favoritos:', error);
					return false;
				}
			},

			getUsersFilter: async (filters) => {
				const { token } = await getStore()

				try {
					const queryString = new URLSearchParams(filters).toString();
					console.log(filters)
					console.log(queryString)
					// Realiza la solicitud GET a la ruta del servidor con la cadena de consulta
					const response = await fetch(`${process.env.BACKEND_URL}/users/filter?${queryString}`, {
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
			getUserDetails: async () => {

				const { token } = await getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL + '/user', {
						method: 'GET',
						headers: {
							"Authorization": "Bearer " + token,
						}
					});

					if (response.ok) {
						const userData = await response.json();
						setStore({
							user_name: userData.user_name,
							last_name: userData.last_name,
						});
						console.log(userData);
					} else {
						console.error('Error en la respuesta del servidor:', response.status);
					}
				} catch (error) {
					console.error('Error al realizar la solicitud:', error);
					throw error;
				}
			},




		}

	};
};

export default getState;