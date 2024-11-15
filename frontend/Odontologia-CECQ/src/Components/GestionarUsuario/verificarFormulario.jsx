
export const handleChange = (event, setFormData) => {
  const { name, value } = event.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

export const isFormValid = (formData) => {
  const { nombre, email, apellido, cuil, contraseña, repeatPassword } = formData;
  const passwordsMatch = contraseña === repeatPassword && contraseña.length >= 8;
  const fieldsComplete = nombre && email && apellido && cuil && contraseña && repeatPassword;
  
  return fieldsComplete && passwordsMatch;
};