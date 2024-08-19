import React, { useState } from 'react';
import Swal from 'sweetalert2';

const MiPerfil = () => {
  const [profile, setProfile] = useState({
    nombre: 'Juan Pérez',
    email: 'juanperez@example.com',
    telefono: '123-456-7890',
  });

  const handleEdit = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Perfil',
      html:
        `<input id="nombre" class="swal2-input" placeholder="Nombre" value="${profile.nombre}">` +
        `<input id="email" class="swal2-input" placeholder="Email" value="${profile.email}">` +
        `<input id="telefono" class="swal2-input" placeholder="Teléfono" value="${profile.telefono}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          nombre: document.getElementById('nombre').value,
          email: document.getElementById('email').value,
          telefono: document.getElementById('telefono').value,
        };
      },
    });

    if (formValues) {
      setProfile(formValues);
      Swal.fire(
        'Actualizado!',
        'Tu perfil ha sido actualizado exitosamente.',
        'success'
      );
    }
  };

  return (
    <div>
      <h2>Mi Perfil</h2>
      <p><strong>Nombre:</strong> {profile.nombre}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Teléfono:</strong> {profile.telefono}</p>
      <button onClick={handleEdit}>Editar Perfil</button>
    </div>
  );
};

export default MiPerfil;
