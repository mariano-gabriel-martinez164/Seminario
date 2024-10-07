import { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Stack, Button } from '@mui/material';
import { postData } from '../../Request/v2/post.js'; 
import { useFetch } from '../../Request/v2/fetch'
import './buscarPaciente.css';

function CrearPaciente({ abrir, cerrar }) {	
	
	const [formValor, cambiarForm] = useState({
		dni: '',
		nombre: '',
		apellido: '',
		email: '',
		fecha_nacimiento: '',
		telefono: '',
	});

	const [errores,nuevosErrores] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		telefono: '',
		email: '',
		fecha_nacimiento: '',
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
				break;
			case 'fecha_nacimiento':
				const formato = /^\d{4}-\d{2}-\d{2}$/; 
				const fechaTMP = formato.test(value);
				const fechaHoy = new Date();
				if(!fechaTMP) {
					mensajeError = 'la fecha tiene un formato invalido';
				}
				if (value > fechaHoy) {
					mensajeError = 'la fecha debe ser una fecha pasada';
				}
				break;
			case 'dni':
				const formatoDNI = /^\d{7,8}$/;
				const validarDNI = formatoDNI.test(value);
				if(!validarDNI){
					mensajeError = 'El formato del dni debe cumplir con 7 o 8 numeros';
				}
					break;
		}
		return mensajeError;
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
		if (!formValor.fecha_nacimiento) camposVacios.push("Fecha de nacimiento");

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
		else {
			postData('/pacientes/', formValor);
			alert('Paciente creado');
		}
	};
	const { data: paciente, loading, error } = useFetch(`/pacientes/${formValor.dni}/`);

	useEffect(() => {
		if(paciente) {
			nuevosErrores((prevErrores) => ({
				...prevErrores,
				dni: 'el DNI ya esta registrado',
			}));
		}
	}, [paciente]);

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
						id="standard-number" 
						type="number"
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
					<TextField	
						sx={{ mt: 1 }} 
						id="standard-basic" 
						label="fecha de nacimiento (YYYY-MM-DD)"
						name="fecha_nacimiento"
						variant="standard" 
						fullWidth
						value={formValor.fecha_nacimiento}
						onChange={cambiosForm}
						error={!!errores.fecha_nacimiento}
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


