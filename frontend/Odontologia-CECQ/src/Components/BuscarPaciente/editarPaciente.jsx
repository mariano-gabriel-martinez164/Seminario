import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Modal, Button, Stack, Paper } from '@mui/material';
import { putData } from '../../Request/v2/put.js';
import  Validar  from './validaciones.jsx';
import './buscarPaciente.css';

export default function EditarPaciente({ abrir, cerrar, paciente }) {
	const { formValor, errores, cambiosForm, controlador } = Validar();
	
	useEffect(() => {
		if(Object.keys(errores).every((key) => !errores[key])){
			putData(`/pacientes/${paciente.dni}/`,formValor);
		}
	}, [errores, formValor]);

	return (
		<>
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
					width: 1100
				}}>
					<form style={{ marginTop: 0 }} onSubmit={controlador}>
						<Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'left' }}>
							Editar datos 
						</Typography>	
						<Stack direction="row" alignItems="center">
							<Typography sx={{ mt: 5, mr: 17}}>{paciente.nombre}</Typography>
							<TextField 
								sx={{ mt: 2 }}
								id="standard-helperText" 
								label="nuevo nombre" 
								variant="standard" 
								name="nombre"
								value={formValor.nombre}
								onChange={cambiosForm}
								error={!!errores.nombre}
								fullWidth />
						</Stack>
						<Stack direction="row" justifyContent="space-between">
							<Typography sx={{ mt: 5, mr: 16 }}>{paciente.apellido}</Typography>
							<TextField 		
								sx={{ mt: 2 }}
								id="standard-helperText" 
								label="nuevo apellido" 
								variant="standard" 		
								name="apellido"
								value={formValor.apellido}
								onChange={cambiosForm}
								error={!!errores.apellido}
								fullWidth />
						</Stack>		
						<Stack direction="row" justifyContent="space-between">
							<Typography sx={{ mt: 5, mr: 12 }}>{paciente.dni}</Typography>
							<TextField 		
								sx={{ mt: 2 }}
								id="standard-helperText" 
								label="nuevo DNI" 
								variant="standard"
								name="dni"
								value={formValor.dni}
								onChange={cambiosForm}
								error={!!errores.dni}
								fullWidth />
						</Stack>
						<Stack direction="row" justifyContent="space-between">
							<Typography sx={{ mt: 5, mr: 5, whiteSpace: 'nowrap' }}>{paciente.telefono}</Typography>
							<TextField 		
								sx={{ mt: 2 }}
								id="standard-helperText" 
								label="nuevo telefono" 
								variant="standard" 		
								name="telefono"
								value={formValor.telefono}
								onChange={cambiosForm}
								error={!!errores.telefono}
								fullWidth />
						</Stack>
						<Stack direction="row" justifyContent="space-between">
							<Typography sx={{ mt: 5, mr: 3 }}>{paciente.email}</Typography>
							<TextField 		
								sx={{ mt: 2 }}
								id="standard-helperText" 
								label="nuevo correo" 
								variant="standard"		
								name="email"
								value={formValor.email}
								onChange={cambiosForm}
								error={!!errores.email}
								fullWidth />
						</Stack>
						<Stack direction="row" justifyContent="space-between">
							<Typography sx={{ mt: 5, mr: 11 }}>{paciente.fecha_nacimiento}</Typography>
							<TextField 		
								sx={{ mt: 2 }}
								id="standard-helperText" 
								label="nueva fecha de nacimiento" 
								variant="standard"		
								name="fecha_nacimiento"
								value={formValor.fecha_nacimiento}
								onChange={cambiosForm}
								error={!!errores.fecha_nacimiento}
								fullWidth />
						</Stack>
						<Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
							<Button onClick={cerrar} variant="outlined" color="error">
								Cancelar
							</Button>
							<Button type="submit" variant="contained" color="success">
								Guardar
							</Button>
						</Stack>
					</form>
				</Box>
			</Modal>
		</>
	)
}

