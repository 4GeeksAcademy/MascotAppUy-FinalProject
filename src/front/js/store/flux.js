//Si hiciste git pull o cambiaste de codespace, hay que cambiar el link y crear nuevas mascotas
const urlLocal= "https://zany-meme-45rxw7xpg55f796-3001.app.github.dev"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			mascotas:[],
			especies: [],
			localidades: [],
			departamentos: [],
			razas: []
			
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
			},

			agregarMascota: (formAMData) =>{
				return async() => {
					try{
						const dataToSend = new formAMData();
						dataToSend.append("nombre", formAMData.nombre);
						dataToSend.append("fecha", formAMData.fecha);
						dataToSend.append("edad", formAMData.edad);
						dataToSend.append("descripcion", formAMData.descripcion);
						dataToSend.append("contacto", formAMData.contacto);
						dataToSend.append("departamento", formAMData.departamento);
						dataToSend.append("localidad", formAMData.localidad);
						dataToSend.append("archivo", formAMData.archivo);
					
						const response = await fetch (urlLocal, {
							method: 'POST',
							body: dataToSend,
						});

						if (response.ok) {
							console.log("Formulario enviado correctamente")
						}

						const result = await response.json();
						return true;
					}
					catch (error) {
						console.log(error);
						return false;
					};

				}
			},
			getEspecies: async () => {
				try {
					// const response = await fetch(urlLocal+"/api/especies");
					const response = await fetch(process.env.BACKEND_URL+"/api/especies");
					
					if(!response.ok) {
						throw new Error("Status: " + response.status)
					}
					const data = await response.json();
					
					// const nombresEspecies = data.results.map(especie => especie.name);
					
					// console.log(nombresEspecies)
        			setStore({ especies: data.results });
					
					return true;
				} catch (error) {
					console.log(error);
					return false;	
				}

			},
			getDepartamentos: async () => {
				try {
					// const response = await fetch(urlLocal+"/api/departamentos");
					const response = await fetch(process.env.BACKEND_URL+"/api/departamentos");
					
					if(!response.ok) {
						throw new Error("Status: " + response.status)
					}
					const data = await response.json();
					console.log(data.results);
					

					// const nombresDepartamentos = data.results.map(departamento => departamento.name);
					// console.log(nombresDepartamentos);
					
        			setStore({ departamentos: data.results });
					
					return true;
				} catch (error) {
					console.log(error);
					return false;	
				}

			},
			getLocalidades: async () => {
				try {
					// const response = await fetch("https://zany-meme-45rxw7xpg55f796-3001.app.github.dev/api/localidades");
					const response = await fetch(process.env.BACKEND_URL+"/api/localidades");
					
					if(!response.ok) {
						throw new Error("Status: " + response.status)
					}
					const data = await response.json();
					console.log(data.results);
					
					// const nombresLocalidades = data.results.map(localidad => localidad.name);
					// console.log(nombresLocalidades);
					
        			setStore({ localidades: data.results });
					
					return true;
				} catch (error) {
					console.log(error);
					return false;	
				}

			},
			getRazas: async () => {
				try {
					// const response = await fetch(urlLocal+"/api/razas");
					const response = await fetch(process.env.BACKEND_URL+"/api/razas");
					
					if(!response.ok) {
						throw new Error("Status: " + response.status)
					}
					const data = await response.json();
					
					// const nombresRazas = data.results.map(raza => raza.name);
					console.log(data.results);
					
        			setStore({ razas: data.results });
					
					return true;
				} catch (error) {
					console.log(error);
					return false;	
				}

			}
	}
};

}

export default getState;
