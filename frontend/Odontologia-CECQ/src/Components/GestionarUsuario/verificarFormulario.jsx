import { postData } from "../../Request/post";
import { usuarioChange, usuarioFormato } from "./usuario";
import { putData } from "../../Request/put";

export const handleChange = (event, setFormData) => {
  const { name, value } = event.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

export const handleSubmit = (formData) => {
  postData('/auth/administrativos/', usuarioFormato(formData));
};

export const handleModify = (formData, usuarioSeleccionado) => {
  putData(`/auth/administrativos/${usuarioSeleccionado}/`, usuarioChange(formData));
};


export const isFormValid = (formData) => {
  const { nombre, email, apellido, cuil, contraseña, repeatPassword } = formData;
  const passwordsMatch = contraseña === repeatPassword && contraseña.length >= 8;
  const fieldsComplete = nombre && email && apellido && cuil && contraseña && repeatPassword;
  
  return fieldsComplete && passwordsMatch;
};