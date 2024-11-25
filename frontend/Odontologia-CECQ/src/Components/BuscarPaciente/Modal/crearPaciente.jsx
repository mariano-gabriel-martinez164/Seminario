import { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Stack, Button } from '@mui/material';
import Validar from '../validaciones.jsx';
import { usePostData } from '../../../Request/v2/post';
import { useFetch } from '../../../Request/v2/fetch';
import '../buscarPaciente.css';

function CrearPaciente({ abrir, cerrar }) {	
	const { formValor, errores, cambiosForm, controlador, nuevosErrores } = Validar();


		return (
			<>
				<Modal open={abrir} onClose={cerrar} aria-labelledby="modal-title" aria-describedby="modal-description">
					<Box sx={{ 
						position: 'absolute', 
						top: '50%', 
						left: '50%', 
						transform: 'translate(-50%, -50%)',
						backgroundColor: 'white',
						p: 4,
						borderRadius: 4,
						boxShadow: 20,
						width: 400
					}}>
				<form style={{ marginTop: 0 }} onSubmit={controlador}>
					<Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'left' }}>
						Nuevo paciente 
					</Typography>
					<TextField 
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="Nombre" 
						name="nombre"
						variant="standard" 
						fullWidth
						value={formValor.nombre}
						onChange={cambiosForm}
						error={!!errores.nombre}/>
					<TextField 
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="Apellido"
						name="apellido"
						variant="standard" 
						fullWidth
						value={formValor.apellido}
						onChange={cambiosForm}
						error={!!errores.apellido}/>
					<TextField 
						sx={{ mt: 1 }} 
						id="standard-number" 
						type="number"
						label="DNI"
						name="dni"
						variant="standard" 
						fullWidth
						value={formValor.dni}
						onChange={cambiosForm}
						error={!!errores.dni}/>
					<TextField 	
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="Telefono"
						name="telefono"
						variant="standard" 
						fullWidth
						value={formValor.telefono}
						onChange={cambiosForm}
						error={!!errores.telefono}/>
					<TextField	
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="correo"
						name="email"
						variant="standard" 
						fullWidth
						value={formValor.email}
						onChange={cambiosForm}
						error={!!errores.email}/>
					<TextField	
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="fecha de nacimiento (YYYY-MM-DD)"
						name="fecha_nacimiento"
						variant="standard" 
						fullWidth
						value={formValor.fecha_nacimiento}
						onChange={cambiosForm}
						error={!!errores.fecha_nacimiento}/>
					<Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
						<Button onClick={cerrar} variant="outlined" color="error">
							cancelar
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
export default CrearPaciente;

