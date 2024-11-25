import { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Stack, Button, Snackbar, Alert } from '@mui/material'
import { useFetch } from '../../../Request/v2/fetch';
import '../buscarPaciente.css';
import { usePostData } from '../../../Request/v2/post.js'
import { useFetchSearch } from '../../../Request/v2/fetch.js';


function CrearPaciente({ abrir, cerrar }) {	
	const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState('info'); 
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const { postData, errorPost, loadingPost } = usePostData();
	const parseData = (data) => data.results;
	const [ data, loading, error, searchData ] = useFetchSearch('/pacientes/',0, parseData);
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
	const  controlador = async (evento) => {
    	evento.preventDefault();
	    const camposVacios = [];
 		if (!formValor.nombre) camposVacios.push("Nombre");
    	if (!formValor.apellido) camposVacios.push("Apellido");
    	if (!formValor.telefono) camposVacios.push("Teléfono");
    	if (!formValor.dni) camposVacios.push("DNI");
    	if (!formValor.email) camposVacios.push("Email");
		if (!formValor.fecha_nacimiento) camposVacios.push("Fecha de nacimiento");

		if (camposVacios.length > 0) {
			setSnackbarMessage(`Se necesitan los siguientes campos: ${camposVacios.join(', ')}`);
            setSeverity('error');
            setOpenSnackbar(true);
        	return;
    	}
    	const erroresPresentes = [];
    	Object.entries(errores).forEach(([campo, error]) => {
        	if (error) erroresPresentes.push(error);
    	});
		if (erroresPresentes.length > 0) {
			setSnackbarMessage(`Errores en los campos: ${erroresPresentes.join(', ')}`);
            setSeverity('error');
            setOpenSnackbar(true);
			return;
		}
		else {
			await searchData(formValor.dni);
			if (data.some((pac) => pac.dni === formValor.dni)){
				alert("DNI en uso");
				return;
			}
			try {
				if(!loading && data){
					await postData('/pacientes/', formValor);
					setSnackbarMessage("Datos actualizados");
					setSeverity('success');
					setOpenSnackbar(true);
				}
			} catch(error) {
				setSnackbarMessage("hubo un problema al enviar los datos: " + error.message);
				setSeverity('error');
				setOpenSnackbar(true);
				}
			}
		}
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
						<Snackbar  sx={{
            				position: 'absolute',
							top: '-70%',
							mr: 2,
							zIndex: 1301,
							maxWidth: '90%',
							minWidth: '350px',
							minHeight: '350px',
        				}} open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                			<Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: '100%' }}>
    	                		{snackbarMessage}
        	        		</Alert>
        	   	 		</Snackbar>
						<form style={{ marginTop: 0 }} onSubmit={controlador}>
					<Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'left' }}>
						Nuevo paciente 
					</Typography>
					<TextField
						required
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
						required
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
						required
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
						required
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
						required
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
						required
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

