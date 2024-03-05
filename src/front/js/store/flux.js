

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

			signUp : async (formData) => {
				try {
					const response = await fetch("https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.preview.app.github.dev/api/signup", {
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
			},

			login : async(formData) =>{
				try {
					const response = await fetch("https://fluffy-space-bassoon-5gqp59qpxg9wf7gjp-3001.app.github.dev/api/token",{
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
			}
		
        }

	};
};

export default getState;
