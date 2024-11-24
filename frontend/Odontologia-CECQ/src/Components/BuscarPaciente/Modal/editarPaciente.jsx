import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Modal, Button, Stack, Paper, Grid, Alert } from '@mui/material';
import '../buscarPaciente.css';
import { usePutData } from '../../../Request/v2/put2.js'

export default function EditarPaciente({ abrir, cerrar, paciente }) {

	const [formValor, cambiarForm] = useState({
		dni: paciente?.dni,
		nombre: paciente?.nombre,
		apellido: paciente?.apellido,
		email: paciente?.email,
		fecha_nacimiento: paciente?.fecha_nacimiento,
		telefono: paciente?.telefono,
	});
	useEffect(() => {
		if(paciente) {
			cambiarForm({
				dni: paciente.dni || '',
				nombre: paciente.nombre || '',
				apellido: paciente.apellido || '',
				email: paciente.email || '',
				fecha_nacimiento: paciente.fecha_nacimiento || '',
				telefono: paciente.telefono || '',
			});
		}
	}, [paciente]);

	const { putData, errorPut, loading } = usePutData();

	const controlador = () => {
		console.log(formValor);
		putData(`/pacientes/${formValor.dni}/` , formValor)
			.catch((err) => {
				console.error('error en ',err);
		})}
	
	const cambios = (event, dato ) => {
		const {name, value } = event.target;
		dato(prevState => ({
			...prevState,
			[name]: value
	}))}

	return (
		<Modal open={abrir} onClose={cerrar} >
			<Box sx={{ 
				position: 'absolute', 
				top: '50%', 
				left: '50%', 
				transform: 'translate(-50%, -50%)',
				backgroundColor: 'white',
				p: 4,
				m: 4,
				borderRadius: 4,
				boxShadow: 20,
				width: 900,
			}}>
			{ loading && <Alert severity="info" sx={{ width: '100%' }}>Cargando... </Alert>}
			{ errorPut && <Alert severity="error" sx={{ width: '100' }}>{errorPut}</Alert>}
			{ paciente && !loading && (
				<>
					<form style={{ marginTop: 0 }}>
						<Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'left' }}>
							Editar datos 
						</Typography>
						<Grid>
							<Grid>
								<TextField 
									label="nombre" 
									sx = {{ mt: 1 }}
									name="nombre"
									value={formValor.nombre}
									onChange={(event)=> cambios(event, cambiarForm)}
									fullWidth />
							</Grid>	
							<Grid>
								<TextField 
									label="apellido" 
									sx = {{ mt: 3 }}
									name="apellido"
									value={formValor.apellido}
									onChange={(event)=> cambios(event, cambiarForm)}
									fullWidth />
							</Grid>
							<Grid>
								<TextField 
									label="Fecha nacimiento" 
									sx = {{ mt: 3 }}
									name="fecha_nacimiento"
									value={formValor.fecha_nacimiento}
									onChange={(event)=> cambios(event, cambiarForm)}
									fullWidth />
							</Grid>
							<Grid>	
								<TextField 
									label="Telefono" 
									sx = {{ mt: 3 }}
									name="telefono"
									value={formValor.telefono}
									onChange={(event)=> cambios(event, cambiarForm)}
									fullWidth />
							</Grid>
							<Grid>
								<TextField 
									label="Correo electronico" 
									sx = {{ mt: 3 }}
									name="email"
									value={formValor.email}
									onChange={(event)=> cambios(event, cambiarForm)}
									fullWidth />
							</Grid>
						</Grid>
						<Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
							<Button onClick={cerrar} variant="outlined" color="error">
								cancelar
							</Button>
							<Button onClick={controlador} variant="outlined" color="warning">
								Modificar
							</Button>
						</Stack>
					</form>
				</>
			)}
		</Box>
	</Modal>
	)
}
