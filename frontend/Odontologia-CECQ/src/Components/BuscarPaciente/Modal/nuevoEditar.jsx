import { useState } from 'react';
import '../buscarPaciente.css';
import { usePutData } from '../../../Request/v2/put2.js';
import {
	Box, Typography,
	TextField, Modal,
	Button, Stack,
	Paper, Grid,
	Alert 
} from '@mui/material';


export default function Editar({ abrir, cerrar, paciente }) {
	const { putData, errorPut, loading } = usePutData();
	const [auxDNI, cambiarDNI ] = useState(paciente.dni);
	const [ formValor, cambiarForm ] = useState({
		dni: auxDNI,
		nombre: paciente?.nombre,
		apellido: paciente?.apellido,
		email: paciente?.email,
		fecha_nacimiento: paciente?.fecha_nacimiento,
		telefono: paciente?.telefono,
	});
	
	const controlador = () => {
		if(formValor){
			console.log(formValor);
			putData(`/pacientes/${formValor.dni}/`, formValor)
		}
	}
	const manejarCambio = (e) => {
		const { name, value } = e.target;
		cambiarForm((anterior) => ({
			...anterior, 
			[name]: value,
		}));
	};

	return (
		<Modal open={abrir} onClose={cerrar}>
			<Box sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%,-50%)',
				backgroundColor:'white',
				p: 4,
				m: 4,
				borderRadius: 4,
				boxShadow: 20,
				width:900,
			}}>			
			{ loading && <Alert severity="info" sx={{ width: '100%' }}>Cargando... </Alert>}
			{ errorPut && <Alert severity="error" sx={{ width: '100' }}>{errorPut}</Alert>}
			{ paciente && !loading && (
				<>
				<form style={{ marginTop: 0}} onSubmit={controlador}>
					<Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'left' }}>
						Editar datos
					</Typography>

					<TextField required sx={{ m: 2 }} label="nombre" name="nombre" value={formValor.nombre} onChange={manejarCambio} />					
					<TextField  required  sx={{ m: 2 }} label="apellido" name="apellido" value={formValor.apellido}  onChange={manejarCambio} />
					<TextField   required sx={{ m: 2 }} label="fecha_nacimiento" name="fecha_nacimiento" value={formValor.fecha_nacimiento}  onChange={manejarCambio} />
					<TextField  required  sx={{ m: 2 }} label="telefono" name="telefono" value={formValor.telefono}  onChange={manejarCambio} />
					<TextField  required  sx={{ m: 2 }} label="email" name="email" value={formValor.email}  onChange={manejarCambio} />
					
					<Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
						<Button onClick={cerrar} variant="outlined" color="error">
							cancelar
						</Button>
						<Button type="submit" variant="contained" color="success">
							Guardar
						</Button>
					</Stack>
				</form>
				</>
			)}
			</Box>
		</Modal>
	)
}
