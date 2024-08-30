//Si hiciste git pull o cambiaste de codespace, hay que cambiar el link y crear nuevas mascotas

const URL = process.env.BACKEND_URL
// const URL = "https://stunning-trout-p46xprx5pprh647j-3001.app.github.dev"


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {},
			mascotas:[],
			especies: [],
			localidades: [],
			departamentos: [],
			razas: [],
			coord_x: null,
			coord_y: null,
			searchResults: [],
			googleLogin: false
			
			
		},
		actions: {
			getAllMascotas: async () => {
				try {
					
					const response = await fetch(URL+"/api/mascotas");
					if(!response.ok) {
						throw new Error("Status: " + response.status)
					}
					const data = await response.json();
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
					const formattedValues = {
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
						url_image: values.url_image || null,
						coord_x: values.coord_x || null,
						coord_y: values.coord_y || null,
					};
					const response = await fetch(URL+'/api/mascotas', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formattedValues)
					});
	
					if (!response.ok) {
						const errorResponse = await response.json();
						throw new Error(errorResponse.message || 'Error al agregar la mascota');
					}
			
					const newMascota = await response.json();
					const store = getStore();
					setStore({
						mascotas: [...store.mascotas, newMascota],
						// Mantén el resto del store igual
						user: {
							...store.user,
							// Actualiza también la lista de mascotas del usuario
							mascotas: [...store.user.mascotas, newMascota]
						}
					});
					
					return true;
				} catch (error) {
					console.error(error);
					return false;
				}
			},

			getEspecies: async () => {
				try {
					
					const response = await fetch(URL+"/api/especies");
					
					if(!response.ok) {
						throw new Error("Status: " + response.status)
					}
					const data = await response.json();
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
        			setStore({ razas: data.results });
					
					return true;
				} catch (error) {
					console.log(error);
					return false;	
				}

			},

			login: async (values) => {
				try {
					let response = await fetch(URL+"/api/login",{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": values.email,
							"password": values.password
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
					console.log("Error:" + error);
					setStore({user: null})
					return false
				}},

			signup: async (values) => {
				try {
					let response = await fetch(URL+"/api/signup",{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								"email": values.email,
								"password": values.password,
								"nombre": values.nombre,
								"telefono": values.telefono,
								"url_image": values.url_image
							  })});
							  let data = await response.json()
							  if (!response.ok){
								const errorResponse = await response.json();
								throw new Error(errorResponse.message)
							  }
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
				if (!token) {
					setStore({user: null});
					return false;
				}
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
						setStore({user:data})
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

			validateTokenGoogle: async () => {
				let token = localStorage.getItem('access_token'); // Obtener el token del localStorage
				if (!token) {
					setStore({ user: null });
					return false;
				}
				try {
					const res = await fetch(URL+"/api/valid-token-google", {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`, // Usa el token del localStorage
							'Content-Type': 'application/json',
						}
					});
			
					const contentType = res.headers.get('Content-Type');
					if (res.ok) {
						if (contentType && contentType.includes('application/json')) {
							const data = await res.json();
							const googleUser = {
								"nombre": data.user.name,
								"email": data.user.email,
								"password": "Dificil@123",
								"telefono": "",
								"url_image": data.user.picture
							}
							if (data.exists){
							setStore({ googleLogin: true });
							getActions().login(googleUser)
							return true
							} else {
							setStore({ googleLogin: true });
							getActions().signup(googleUser)
							return true;
							}
						} else {
							console.error('Response is not JSON:', await res.text());
						}
					} else {
						console.error('Error validating token:', res.statusText);
					}
			
					setStore({ user: null });
					return false;
				} catch (error) {
					console.error('Fetch error:', error);
					setStore({ user: null });
					return false;
				}
			},

			logout: async () => {
				localStorage.removeItem("access_token");
				setStore({user:null})
				setStore({ googleLogin: false });
				return true
			},

			editarMascota: async (values, id) =>{
				try {
					const formattedValues = {
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
						url_image: values.url_image || null,
						coord_x: values.coord_x || null,
						coord_y: values.coord_y || null,
					};
					const response = await fetch(URL+`/api/mascotas/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formattedValues)
					});
	
					if (!response.ok) {
						const errorResponse = await response.json();
						throw new Error(errorResponse.message || 'Error al agregar la mascota');
					}
			
					const editMascota = await response.json();
					const store = getStore();
					/// Actualizar la lista de mascotas del usuario correctamente
					const updatedMascotas = store.user.mascotas.map(mascota =>
						mascota.id === id ? editMascota : mascota
					);
			
					// Actualizar el store sin anidar innecesariamente
					setStore({
						user: {
							...store.user,
							mascotas: updatedMascotas,
						}
					});
					return true;
				} catch (error) {
					console.error(error);
					return false;
				}
			
			},
			deleteMascota: async (id) =>{
				try {
					
					const response = await fetch(URL+`/api/mascotas/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							is_active : false
						})
					});
	
					if (!response.ok) {
						const errorResponse = await response.json();
						throw new Error(errorResponse.message || 'Error al agregar la mascota');
					}
			
					const deleteMascota = await response.json();
					const store = getStore();
					const actions = getActions();

					// Filtrar la lista de mascotas para excluir la eliminada (desactivada)
					const updatedMascotas = store.user.mascotas.filter(mascota => mascota.id !== id);

					// Actualizar el store sin anidar innecesariamente
					setStore({
						user: {
							...store.user,
							mascotas: updatedMascotas,
						}
					});

					await actions.getAllMascotas();

					return true;
				} catch (error) {
					console.error(error);
					return false;
				}
			
			},

			uploadImage: async (formData) => {
				try {
					const response = await fetch(URL+'/api/upload-file', {
						method: 'POST',
						body: formData,
					});
			
					if (!response.ok) {
						throw new Error('Error al subir la imagen');
					}
			
					const data = await response.json();
					return data.url; // URL de la imagen subida
				} catch (error) {
					console.error(error);
					return null;
				}
			},
			
			editarUsuario: async (values) =>{
				const store = getStore();
				try {
					const response = await fetch(URL+`/api/usuarios/${store.user.id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							"email": values.email,
							"password": values.newPassword,
							"nombre": values.nombre,
							"telefono": values.telefono,
							"url_image": values.url_image,
							"is_active": true
						})
					});
	
					if (response.ok) {
						const data = await response.json();
						setStore({ user: data.user }); 
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.error("Error updating user:", error);
					return false;
				}
			},

			eliminarUsuario: async (id) =>{
				const store = getStore();
				try {
					const response = await fetch(URL+`/api/usuarios/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							"is_active": false
						})
					});
	
					if (response.ok) {
						setStore({ user: null }); 
						return true;
					
					}
				} catch (error) {
					console.error("Error deleting user:", error);
					return false;
				}
			},

			setCoords: (coord_x, coord_y) => {
				if (coord_x === undefined || coord_y === undefined) {
					return false; // Devuelve false si no hay coordenadas
				}

				// Actualiza el estado con ambos valores en una sola llamada
				setStore({ coord_x, coord_y });
				return true; // Devuelve true si se actualizaron las coordenadas
			},

			buscar: async (query) => {
				try {
					const response = await fetch(URL + `/api/buscar?q=${encodeURIComponent(query)}`);
					const data = await response.json();
					if (!response.ok) {
						throw new Error('Error en la solicitud');
					}
					setStore({ searchResults: data });
					return data;
				} catch (error) {
					console.error('Error en la búsqueda:', error);
					return { error: 'Error en la búsqueda' };
				}
			},

			updateUserImage: (url) => {
				const store = getStore();
				setStore({ 
					user: {
						...store.user,
						url_image: url
					}
				});
			},
		}
	}
}

export default getState;
