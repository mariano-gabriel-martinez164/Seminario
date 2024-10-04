import { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Stack, Button } from '@mui/material';
import './buscarPaciente.css';

function CrearPaciente({ abrir, cerrar }) {	

	const [formValor, cambiarForm] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		telefono: '',
		email: '',
	});
	const [errores,nuevosErrores] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		telefono: '',
		email: '',
	});

	const cambiosForm = (e) => {
		const { name, value } = e.target;
		cambiarForm({
			...formValor,
			[name]: value,
		});
		const mensajeError = validarCampo(name, value);
		nuevosErrores((prevErrores) => ({
			...prevErrores,
			[name]: mensajeError,
		}));
	};

	const validarCampo = (name, value) => {
		let mensajeError = '';
		switch(name) {
			case 'nombre':
				if(value.length < 3 ) {
					mensajeError = 'el nombre debe tener un minimo de tres caracteres';
				}
				if(value.length > 12) {
					mensajeError = 'el nombre debe tener un maximo de doce caracteres';
				}
				break;
			case 'apellido':
				if(value.length < 4 ) {
					mensajeError = 'el apellido debe tener un minimo de cuatro caracteres';
				}
				if(value.length > 12) {
					mensajeError = 'el apellido debe tener un maximo de doce caracteres';
				}
				break;
			case 'telefono':
				if(value.length != 10) {
					mensajeError = 'el telefono debe tener 10 numeros';
				}
		}
	}

	const controlador = (evento) => {
    	evento.preventDefault();
		// Verificar campos vacíos
	    const camposVacios = [];
 		if (!formValor.nombre) camposVacios.push("Nombre");
    	if (!formValor.apellido) camposVacios.push("Apellido");
    	if (!formValor.telefono) camposVacios.push("Teléfono");
    	if (!formValor.dni) camposVacios.push("DNI");
    	if (!formValor.email) camposVacios.push("Email");

    	if (camposVacios.length > 0) {
       		alert(`Se necesitan los siguientes campos: ${camposVacios.join(", ")}`);
        	return;
    	}
    	// Verificar errores de validación
    	const erroresPresentes = [];
    	Object.entries(errores).forEach(([campo, error]) => {
        	if (error) erroresPresentes.push(error);
    	});
    	if (erroresPresentes.length > 0) {
        	alert(`Errores en los campos: ${erroresPresentes.join(", ")}`);
			return;
   		}
		alert("Paciente agregado");
	};

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
					width: 700
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
						error={!!errores.nombre}
					/>
					<TextField 
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="Apellido"
						name="apellido"
						variant="standard" 
						fullWidth
						value={formValor.apellido}
						onChange={cambiosForm}
						error={!!errores.apellido}
					/>
					<TextField 
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="DNI"
						name="dni"
						variant="standard" 
						fullWidth
						value={formValor.dni}
						onChange={cambiosForm}
						error={!!errores.dni}
					/>
					<TextField 	
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="Telefono"
						name="telefono"
						variant="standard" 
						fullWidth
						value={formValor.telefono}
						onChange={cambiosForm}
						error={!!errores.telefono}
					/>
					<TextField	
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="correo"
						name="email"
						variant="standard" 
						fullWidth
						value={formValor.email}
						onChange={cambiosForm}
						error={!!errores.email}
					/>
					<Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
						<Button onClick={cerrar} variant="outlined" color="error">
							cancelar
						</Button>
						<Button type="submit" variant="contained" color="error">
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


