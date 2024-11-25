export const usuarioFormato = (formData, selectedCentro, isChecked) => ({
    "first_name": formData.nombre,
    "last_name": formData.apellido,
    "email": formData.email,
    "cuil": formData.cuil,
    "password": formData.contraseña,
    "is_staff": isChecked,
    "centro": selectedCentro,
  });

export const usuarioChange = (formData) => ({
    "first_name": formData.nombre,
    "last_name": formData.apellido,
    "email": formData.email,
    "cuil": formData.cuil,
  });