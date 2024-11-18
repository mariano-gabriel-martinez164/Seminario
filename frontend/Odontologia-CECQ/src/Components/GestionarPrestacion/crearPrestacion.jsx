import { Dialog, Alert, Button, DialogActions, TextField, DialogContent, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { usePostData } from '../../Request/v2/post'
import { useState } from 'react'

const prestacion = (codigo, nombre, precio) => ({
  "codigo": codigo,
  "nombre": nombre,
  "precio": precio,
  "is_active": true
});

export default function CrearPrestacion({open, onClose, setEstado}) {
  const [ nombre, setNombre ] = useState('');
  const [ precio, setPrecio ] = useState('');
  const [ codigo, setCodigo ] = useState('');
  const isValidPrice = (precio) => {
    return /^\d+(\.\d{1,2})?$/.test(precio);
  };

  const { postData, errorPost, loading } = usePostData();

  const handleSubmit = async (formData) => {
      postData(`/prestaciones/`,prestacion(codigo, nombre, precio))
      .then(() => {
        setEstado('Creado');
        onClose();
      })
      .catch((error) => {
        console.error('Error al crear la agenda:', errorPost);
    });
  }

  return (
    <Dialog
    open={open}
    onClose={onClose}
  > 
  <DialogContent>
  {errorPost && <Alert severity="error" sx={{mb:2}}>{errorPost}</Alert>}
  <Container id='container' >
    <Grid container spacing={2} sx={{ mt:3, mb:3 , justifyContent: 'center' }}>
      <Grid size={12}>
        <TextField 
          id="outlined-basic" 
          label="Nombre" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          variant="outlined" />
      </Grid>
      <Grid size={12}>
        <TextField 
        id="outlined-basic" 
        label="Codigo" 
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)} 
        fullWidth
        variant="outlined" />
      </Grid>
      <Grid size={12}>
        <TextField 
        id="outlined-basic" 
        label="Precio" 
        value={precio} 
        onChange={(e) => setPrecio(e.target.value)}
        fullWidth
        error={!!precio && !isValidPrice(precio)} 
        helperText={!!precio && !isValidPrice(precio) ? "Formato inválido. Ejemplo: 100 o 100.99" : ""}
        variant="outlined" />
      </Grid>
    </Grid>

    <DialogActions>
          <Button 
          onClick={() => {
            handleSubmit();
          }} 
          variant="contained" color='success' id='button'
        disabled={!nombre || !precio || !codigo || !isValidPrice(precio)}
          >
            Crear agenda 
          </Button>

          <Button onClick={() => onClose()} variant="contained" id='button'>Cerrar</Button>
        </DialogActions>
        </Container>
      </DialogContent>
  </Dialog>
  )
}
