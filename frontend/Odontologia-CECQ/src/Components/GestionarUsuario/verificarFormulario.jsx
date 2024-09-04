import { postData } from "../../Request/post";
import { usuarioChange } from "./usuario";
import { putData } from "../../Request/put";

export const handleChange = (event, setFormData) => {
  const { name, value } = event.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

export const handleSubmit = (event, setValidated, formData) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false || formData.contraseña.length < 8) {
    event.preventDefault();
    event.stopPropagation();
  }
  event.preventDefault();
  postData('/auth/administrativos/', usuarioFormato(formData));
  setValidated(true);
};

export const handleModify = (event, setValidated, formData, usuarioSeleccionado) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  event.preventDefault();
  putData(`/auth/administrativos/${usuarioSeleccionado}/`, usuarioChange(formData));
  console.log(usuarioFormato(formData));
  setValidated(true);
};