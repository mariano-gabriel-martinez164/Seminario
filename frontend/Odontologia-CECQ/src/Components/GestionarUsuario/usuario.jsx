export const usuarioFormato = (formData) => ({
    "first_name": formData.nombre,
    "last_name": formData.apellido,
    "email": formData.email,
    "cuil": formData.cuil,
    "password": formData.contraseña,
    "is_staff": false,
    "centro": null,
  });

export const usuarioChange = (formData) => ({
    "first_name": formData.nombre,
    "last_name": formData.apellido,
    "email": formData.email,
    "cuil": formData.cuil,
  });