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
			getProfile: async () => {
				try {
					const token = store.token
					const response = await fetch("https://glowing-cod-x5vgjg7x9gqhp79g-3001.app.github.dev/api/users/profile", {
						method: "GET",
						headers: {
							"Authoritation": "Bearer " + token ,
							"Content-Type": "application/json"
						}
					});
					if (!response.ok) {
						throw new Error(data.message || "Usuario no encontrado")
					}
					const userProperties = await response.json();
					setStore({ userProperties: userProperties })

				} catch (error) {
					throw error;
				}
			},

			signUp : async (formData) => {
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


			getAllUsers: async () => {
				try {
					// Realizar la llamada a la API para obtener todos los usuarios con propiedades
					const response = await fetch(process.env.BACKEND_URL + '/users/properties');
			
					
					if (!response.ok) {
						throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
					}
			
					const data = await response.json();
					setStore({ allUsers: data });
					console.log(data);
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
					const response = await fetch(process.env.BACKEND_URL + `/user/${id}`, {
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