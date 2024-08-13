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
			},

			agregarMascota: (formAMData) =>{
				return async() => {
					try{
						const dataToSend = new formAMData();
						dataToSend.append("estado", formAMData.estado);
						dataToSend.append("nombre", formAMData.nombre);
						dataToSend.append("fecha", formAMData.fecha);
						dataToSend.append("sexo", formAMData.sexo);
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
		}
	}
};

}

export default getState;
