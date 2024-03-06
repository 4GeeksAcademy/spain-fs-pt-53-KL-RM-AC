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
					const store = getStore()
					const response = await fetch(process.env.BACKEND_URL + '/signup', {
						method: "POST",
						headers: {
							"Authorization": "Bearer " + store.token,
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

			login : async(formData) =>{
				try {
					const response = await fetch(process.env.BACKEND_URL + '/token',{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});
					if (!response.ok){
						const data= await response.json();
						throw new Error(data.message || "Error log in");
					}
					else if (response.ok){
						const data = await response.json();
						localStorage.setItem('token', data.access_token);
						console.log('Token:', data.access_token);   
					
					}
				}catch (error) {
					throw error;
				}
			},
			
        }

	};
};

export default getState;