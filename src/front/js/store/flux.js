//Si hiciste git pull o cambiaste de codespace, hay que cambiar el link y crear nuevas mascotas
// const urlLocal= "https://mascotapp-uy-ybp5.onrender.com"
const URL = process.env.BACKEND_URL
// const URL = "https://vigilant-waddle-9rxpj9pgqxrfxx7j-3001.app.github.dev"


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			mascotas:[],
			especies: [],
			localidades: [],
			logged: null,
			departamentos: [],
			razas: []
			
		},
		actions: {
			getAllMascotas: async () => {
				try {
					
					const response = await fetch(URL+"/api/mascotas");
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
					
						const response = await fetch (URL+"/api/mascotas", {
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
					
					const response = await fetch(URL+"/api/especies");
					
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
					
					const response = await fetch(URL+"/api/departamentos");
					
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
					
					const response = await fetch(URL+"/api/localidades");
					
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
					
					const response = await fetch(URL+"/api/razas");
					
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

			},

			login: async (email, password) => {
				try {
					let response = await fetch(URL+"/api/login",{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						  })});
						  let data = await response.json()
						  console.log(data);
						  if (response.ok){
							localStorage.setItem('access_token', data.access_token)
							setStore({logged:data.logged})
							return true
						  }
						  setStore({logged: false})
						  return false
				} catch (error) {
					console.log(error);
					setStore({logged: false})
					return false
				}},

			signup: async (email, password, nombre, telefono) => {
				try {
					let response = await fetch(URL+"/api/signup",{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								"email": email,
								"password": password,
								"nombre": nombre,
								"telefono": telefono
							  })});
							  let data = await response.json()
							  if (response.ok){
								localStorage.setItem('access_token', data.access_token)
								setStore({logged:data.logged})
								return true
							  }
							  return false
					} catch (error) {
						console.log(error);
						return false
					}},

		}
	}
}

export default getState;
