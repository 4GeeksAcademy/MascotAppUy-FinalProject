//Si hiciste git pull o cambiaste de codespace, hay que cambiar el link y crear nuevas mascotas
// const urlLocal= "https://mascotapp-uy-ybp5.onrender.com"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			mascotas:[],
			especies: ["Perro", "Gato"],
			localidades: ["Guichón", "Bella Unión"]
			
		},
		actions: {
			
	
			getAllMascotas: async () => {
				try {
					
					const response = await fetch(process.env.BACKEND_URL+"/api/mascotas");
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
