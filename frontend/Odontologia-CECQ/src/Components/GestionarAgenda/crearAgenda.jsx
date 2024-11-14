import { Dialog, Button, DialogActions, DialogContent, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { SelectorOdontologo, SelectorCentro } from '../MaterialUI/selectores'
import { useState } from 'react'
import { postData } from '../../Request/post'
import { agenda } from './agenda'

export default function CrearAgenda({open, onClose, setEstado}) {
  const [centro, setCentro] = useState(null);
  const [ odontologo, setOdontologo ] = useState([]);

  return (
    <Dialog
    open={open}
    onClose={onClose}
  >
    <DialogContent>
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
            postData(`/agendas/`, agenda(odontologo.matricula, centro.id));
            onClose();
            setEstado('Creado');
          }} 
          variant="outlined" color='success' id='button'
          disabled={!centro || !odontologo }
          >
            Crear agenda 
          </Button>

          <Button onClick={() => onClose()} variant="outlined" id='button'>Cerrar</Button>
        </DialogActions>
        </Container>
        </DialogContent>
  </Dialog>
  )
}
