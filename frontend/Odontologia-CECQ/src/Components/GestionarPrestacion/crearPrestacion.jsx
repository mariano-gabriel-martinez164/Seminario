import { Dialog, Button, DialogActions, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { postData } from '../../Request/post'
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
  return (
    <Dialog
    open={open}
    onClose={onClose}
  > 
    <TextField 
        id="outlined-basic" 
        label="Nombre" 
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        sx={{m:2}} 
        variant="outlined" />
    <Grid container spacing={2} sx={{minWidth:'600px', mb:3 , justifyContent: 'center' }}>
      <Grid size={5}>
        <TextField 
        id="outlined-basic" 
        label="Codigo" 
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)} 
        variant="outlined" />
      </Grid>
      <Grid size={5}>
        <TextField 
        id="outlined-basic" 
        label="Precio" 
        value={precio} 
        onChange={(e) => setPrecio(e.target.value)}
        error={!!precio && !isValidPrice(precio)} 
        helperText={!!precio && !isValidPrice(precio) ? "Formato inválido. Ejemplo: 100 o 100.99" : ""}
        variant="outlined" />
      </Grid>
    </Grid>

    <DialogActions>
          <Button 
          onClick={() => {
            postData(`/prestaciones/`,prestacion(codigo, nombre, precio));
            onClose();
            setEstado('Creado');
          }} 
          variant="outlined" color='success' id='button'
        disabled={!nombre || !precio || !codigo || !isValidPrice(precio)}
          >
            Crear agenda 
          </Button>

          <Button onClick={() => onClose()} variant="outlined" id='button'>Cerrar</Button>
        </DialogActions>
  </Dialog>
  )
}
