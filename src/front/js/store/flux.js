//Si hiciste git pull o cambiaste de codespace, hay que cambiar el link y crear nuevas mascotas
const urlLocal= "https://turbo-space-disco-v95xqvxjpjjfw49v-3001.app.github.dev"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			mascotas:[]
			
		},
		actions: {
			
	
			getAllMascotas: async () => {
				try {
					
					const response = await fetch(urlLocal+"/api/mascotas");
					if(!response.ok) {
						throw new Error("Status: " + response.status)
					}
					const data = await response.json();
					
					// console.log(data.results)
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
