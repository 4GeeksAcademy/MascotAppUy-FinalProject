const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			mascotas:[]
			
		},
		actions: {
			//Use getActions to call a function within a fuction
			getAllMascotas: async () => {
				try {
					const response = await fetch("https://turbo-space-disco-v95xqvxjpjjfw49v-3001.app.github.dev/api/mascotas");
					if(!response.ok) {
						throw new Error("Status: " + response.status)
					}
					const data = await response.json();
					
					console.log(data.results)
					setStore({ mascotas: data.results });
					
					return true;
				} catch (error) {
					console.log(error);
					return false;	
				}
			}
		}
	};
};

export default getState;
