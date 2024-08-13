//Si hiciste git pull o cambiaste de codespace, hay que cambiar el link y crear nuevas mascotas
// const urlLocal= "https://mascotapp-uy-ybp5.onrender.com"
// const URL = process.env.BACKEND_URL
const URL = "https://solid-potato-x74jvwjgr4q3p766-3001.app.github.dev"


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {},
			mascotas:[],
			especies: [{
				"id": 1,
				"name": "Perro"
			},
			{
				"id": 2,
				"name": "Gato"
			}],
			localidades: [{
				"departamento_id": 1,
				"id": 5,
				"name": "AGRACIADA"
			},
			{
				"departamento_id": 1,
				"id": 6,
				"name": "ABRA DE ZABALETA"
			},
			{
				"departamento_id": 1,
				"id": 7,
				"name": "ABRA DE ALFEREZ"
			},
			{
				"departamento_id": 2,
				"id": 8,
				"name": "ACEGUA"
			},
			{
				"departamento_id": 2,
				"id": 9,
				"name": "25 DE MAYO"
			}],
			departamentos: [{
				"id": 1,
				"name": "ARTIGAS"
			},
			{
				"id": 2,
				"name": "CANELONES"
			}],
			razas: [{
				"especie_id": 1,
				"id": 3,
				"name": "Cruza"
			},
			{
				"especie_id": 1,
				"id": 4,
				"name": "Abisinio"
			},
			{
				"especie_id": 2,
				"id": 5,
				"name": "Africano doméstico"
			}]
			
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

			agregarMascota: async (values) =>{
				// const userId = getStore().user.id
				try {
					const response = await fetch(URL+'/api/mascotas', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							nombre: values.nombre, 
							edad: values.edad, 
							sexo: values.sexo, 
							descripcion: values.descripcion, 
							estado: values.estado, 
							fecha_perdido: values.fecha_perdido,  
							especie_id: parseInt(values.especie_id),
							raza_id: parseInt(values.raza_id), 
							localidad_id: parseInt(values.localidad_id),
							departamento_id: parseInt(values.departamento_id),
							user_id: values.user_id,
						})
					});
	
					if (!response.ok) {
						throw new Error('Error al agregar la mascota');
					}
					const newMascota = await response.json();
					const store = getStore();
					setStore({ mascotas: [...store.mascotas, newMascota] });
					console.log(newMascota);
					
					return true
				} catch (error) {
					console.error(error);
					return false
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
						  if (response.ok){
							localStorage.setItem('access_token', data.access_token)
							setStore({user:data.user})
							return true
						  }
						  setStore({user: null})
						  return false
				} catch (error) {
					console.log(error);
					setStore({user: null})
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
								setStore({user:data.user})
								return true
							  }
							  return false
					} catch (error) {
						console.log(error);
						return false
					}
			},
			
			validateToken: async () => {
				let token = localStorage.getItem('access_token');
				try {
					let response = await fetch(URL+"/api/valid-token", {
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							'authorization': `Bearer ${token}`
						}
					})
					let data = await response.json();
					if (response.ok){
						setStore({user:data.user})
						return true
					}
					setStore({user:null})
					return false;
				} catch (error) {
					console.log(error);
					setStore({user:null})
					return false;
				}
			},
			logout: async () => {
				localStorage.removeItem("access_token");
				setStore({user:null})
			}
		}
	}
}

export default getState;
