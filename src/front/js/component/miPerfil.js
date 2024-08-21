import React, { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import '../../styles/miPerfil.css';

const MiPerfil = () => {
  const [profile, setProfile] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false); 
  const [showPasswordFields, setShowPasswordFields] = useState(false); // Estado para mostrar/ocultar los campos de contraseña

  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await fetch('/api/user-profile', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const userData = await response.json();
  //         setProfile({
  //           nombre: userData.nombre,
  //           email: userData.email,
  //           telefono: userData.telefono,
  //           password: '', 
  //         });
  //       } else {
  //         console.error('Error al obtener los datos del perfil');
  //       }
  //     } catch (error) {
  //       console.error('Error en la solicitud del perfil:', error);
  //     }
  //   };

  //   fetchProfile();
  // }, [token]);

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire(
      'Actualizado!',
      'Tu perfil ha sido actualizado exitosamente.',
      'success'
    );
    setIsEditing(false);
    setShowPasswordFields(false); // Oculta los campos de contraseña después de guardar
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setShowPasswordFields(false); // Restablece los campos de contraseña si se deja de editar
  };

  const handlePasswordEditClick = () => {
    setShowPasswordFields(!showPasswordFields); 
  };

  return (
    <div className="form-container mt-5 w-50">
      <h2>Mi cuenta</h2>
      <form onSubmit={handleSubmit}>
        
      <div className="input-group d-flex mb-4">
          <span className="px-2"><i className="fas fa-camera"></i></span>
          <input
            id="imagenPerfil"
            name="imagenPerfil"
            className="w-75 ps-2"
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Maneja el cambio de imagen de perfil
            disabled={!isEditing} // Deshabilita la edición si no presiona el botón para editar
          />
        </div>

        <div className="input-group d-flex mb-4">
          <span className="px-2"><i className="fas fa-user"></i></span>
          <input
            id="nombre"
            name="nombre"
            className="w-75 ps-2"
            type="text"
            placeholder="Nombre"
            onChange={handleChange}
            value={profile.nombre}
            disabled={!isEditing} // Deshabilita la edición si no presiona el botón para editar
          />
        </div>
        
        <div className="input-group d-flex mb-4">
          <span className="px-2"><i className="fas fa-envelope"></i></span>
          <input
            id="email"
            name="email"
            className="w-75 ps-2"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={profile.email}
            disabled={!isEditing} // Deshabilita la edición si no presionar el botón para editar
          />
        </div>
        
        <div className="input-group d-flex mb-4">
          <span className="px-2"><i className="fas fa-phone"></i></span>
          <input
            id="telefono"
            name="telefono"
            className="w-75 ps-2"
            type="text"
            placeholder="Teléfono"
            onChange={handleChange}
            value={profile.telefono}
            disabled={!isEditing} // Deshabilita la edición si no presiona el botón para editar

          />
        </div>

        <div className="input-group d-flex mb-4">
          <span className="px-2"><i className="fas fa-lock"></i></span>
          <input
            id="password"
            name="password"
            className="w-75 ps-2"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={profile.password}
            disabled={!isEditing}
          />
        </div>

         <i
            className="fas fa-edit me-2"
            style={{ cursor: 'pointer', color: '#040926;' }}
            onClick={handleEditClick}
          ></i>
        
        <button type="submit" style={{
          backgroundColor: '#FF8A5B',
          border: 'none',
          color: '#FFFFFF',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        disabled={!isEditing} // Deshabilita la edición si no presiona el botón para editar
        >
          Guardar Cambios
        </button>
        {isEditing && (
          <div className="mt-4">
            <button
              type="button"
              style={{
                backgroundColor: '#040629',
                border: 'none',
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              onClick={handlePasswordEditClick}
            >
              {showPasswordFields ? 'Cancelar cambio de contraseña' : 'Cambiar Contraseña'}
            </button>

            {showPasswordFields && (
              <>
                <div className="input-group d-flex mt-4 mb-4">
                  <span className="px-2"><i className="fas fa-lock"></i></span>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    className="w-75 ps-2"
                    type="password"
                    placeholder="Contraseña Actual"
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="input-group d-flex mb-4">
                  <span className="px-2"><i className="fas fa-lock"></i></span>
                  <input
                    id="newPassword"
                    name="newPassword"
                    className="w-75 ps-2"
                    type="password"
                    placeholder="Nueva Contraseña"
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="input-group d-flex mb-4">
                  <span className="px-2"><i className="fas fa-lock"></i></span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-75 ps-2"
                    type="password"
                    placeholder="Confirmar Nueva Contraseña"
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default MiPerfil;
