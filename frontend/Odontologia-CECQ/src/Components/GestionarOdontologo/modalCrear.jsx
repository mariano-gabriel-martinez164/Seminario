import React, { useState } from "react";
import { Alert, Container, Dialog, DialogContent, TextField, Button, DialogActions } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { handleChange } from "../GestionarUsuario/verificarFormulario";
import { usePostData } from "../../Request/v2/post";

const odontologo = (matricula, nombre, apellido, cuil) => ({
  "matricula": matricula,
  "nombre": nombre,
  "apellido": apellido,
  "cuil": cuil
});


export function ModalCrearOdontologo({ open, onClose, setEstadoModal }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cuil: "",
    matricula: "",
  });
  
  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");
  const { postData, errorPost, loading } = usePostData();

  const handleSubmit = async (formData) => {
    postData('/odontologos/', odontologo(formData.matricula, formData.nombre, formData.apellido, formData.cuil))
    .then(() => {
      setEstadoModal('Creado');
      onClose();
    })
    .catch((error) => {
    console.error('Error al crear el usuario:', errorPost);
  });
  }

  return (
    <Dialog
    open={open}
    onClose={onClose}
    keepMounted
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogContent>
      {errorPost && <Alert severity="error" sx={{mb:2}}>{errorPost}</Alert>}
      <Container id='container'>
        <form>
          <Grid container spacing={2}>
            
            <Grid size={6}>
              <TextField
                label='Nombre'
                multiline
                maxRows={4}
                name="nombre"
                value={formData.nombre}
                onChange={(event) => handleChange(event, setFormData)}
                fullWidth
              />
            </Grid>

            <Grid size={6}>
              <TextField
                label='Apellido'
                multiline
                maxRows={4}
                name="apellido"
                value={formData.apellido}
                onChange={(event) => handleChange(event, setFormData)}
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label='Cuil'
                multiline
                maxRows={4}
                name="cuil"
                value={formData.cuil}
                onChange={(event) => handleChange(event, setFormData)}
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label='Matrícula'
                multiline
                maxRows={4}
                name="matricula"
                value={formData.matricula}
                onChange={(event) => handleChange(event, setFormData)}
                fullWidth
              />
            </Grid>

          </Grid>
        </form>
      </Container>
    </DialogContent>

    <DialogActions>
      <Button 
        onClick={() => {
          handleSubmit(formData);
        }}
        variant="contained"
        color='success'
        id='button'
        disabled={!isFormValid}
      >
        Agregar odontólogo
      </Button>
      <Button onClick={() => onClose()} variant="contained" id='button'>Cerrar</Button>
    </DialogActions>
  </Dialog>
  );
}
 