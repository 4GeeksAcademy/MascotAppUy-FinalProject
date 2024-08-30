import React, {useState} from "react";
import "../../styles/contacto.css"
const Contacto = () =>{
    const [nombre, setNombre] = useState('');
  //
    const [email, setEmail] = useState('');
    const [motivo, setMotivo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const enviarForm = (e) => {
        e.preventDefault();
        setNombre('');
        setEmail('');
      
        setMotivo('');
        setMensaje('');
    }

    return(
        <div className="container">
        

        <div className="my-5 py-5">
        
        <div className="row g-1">
          <div className="col-md-6">
            <h3>¿Quienes somos?</h3>
            <p className="mt-5">Somos una plataforma dedicada a conectar mascotas perdidas y encontradas con sus hogares, 
              así como también a encontrar hogares para mascotas en adopción.</p>

            <p>Nuestra misión es facilitar la reunificación de mascotas perdidas con sus familias y ayudar a aquellas que buscan un hogar amoroso a encontrar el lugar perfecto. 
              Creemos en la importancia de cada vida animal y en el impacto positivo que un hogar amoroso puede tener en la vida de una mascota.</p>

            <p>Si deseas más información, tienes alguna pregunta, o simplemente quieres ponerte en contacto con nosotros, no dudes en hacerlo.</p>
          </div>


          <div className="col-md-6 d-flex justify-content-center">
            
              <form className="contacto-form w-75" onSubmit={enviarForm}>
              <h2 className="text-center mb-5">Contacto</h2>
                <div className="input-group input-group-sm" >
                  <input
                    
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
      
      
              <div className="input-group input-group-sm">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group input-group-sm">
                <select 
                  className="form-select border-0" 
                  id="motivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                  >
                  <option value="">Seleccione una opción</option>
                  <option value="consulta">Consulta</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="reclamo">Reclamo</option>
                </select>
                                      
              </div>
      
              <div className="input-group input-group-sm">
                <textarea
                  className="border-0" 
                  placeholder="Mensaje" 
                  id="mensaje" 
                  value={mensaje} 
                  onChange={(e) => setMensaje(e.target.value)} 
                  style={{width: "100%"}}
                ></textarea>
              </div>
      
            
                <button type="submit" className="btn enviar w-100 mt-2 mb-5">Enviar</button>
              
            </form>

          </div>

          

        </div>
        
        </div>
      </div>
             
    )
}

export default Contacto;