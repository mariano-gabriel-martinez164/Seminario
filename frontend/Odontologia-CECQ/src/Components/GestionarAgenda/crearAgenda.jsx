import { Dialog, Alert, Button, DialogActions, DialogContent, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { SelectorOdontologo, SelectorCentro } from '../MaterialUI/selectores'
import { useState } from 'react'
import { usePostData } from '../../Request/v2/post'
import { agenda } from './agenda'

export default function CrearAgenda({open, onClose, setEstado, setEstadoCrear}) {
  const [centro, setCentro] = useState(null);
  const [ odontologo, setOdontologo ] = useState([]);

  const { postData, errorPost, loading } = usePostData();

  const handleSubmit = async (formData) => {
      postData('/agendas/', agenda(odontologo.matricula, centro.id))
      .then(() => {
        setEstado('Creado');
        setEstadoCrear('Creado');
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
    <Container id='container'>
    <Grid container spacing={2} sx={{ mt:3, mb:3 , justifyContent: 'center' }}>
      <Grid size={12}>
        <SelectorOdontologo
          selectedValue={odontologo}
          setSelectedValue={setOdontologo}
        /> 
      </Grid>
      <Grid size={12}>
        <SelectorCentro
          selectedValue={centro}
          setSelectedValue={setCentro} 
        />
      </Grid>
    </Grid>

    <DialogActions>
          <Button 
          onClick={() => {
            handleSubmit();
          }} 
          variant="contained" color='success' id='button'
          disabled={!centro || !odontologo }
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
