import React, { useState, useEffect } from 'react'
import './buscarPaciente.css'
import { Button, Container, Table, TableRow, TableHead, TableBody, Paper,TableCell, TableContainer } from '@mui/material';
import { Box, Stack, Modal, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { postData } from '../../Request/post';

export default function buscarPaciente() {

	const [ paciente, cambiarPaciente ] = useState([]);
	const valor = 11111111

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
				break;
			case 'email':
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					mensajeError = 'el correo es invalido';
				}
				break;
			case 'dni':
				if(!/^\d+$/.test(value)){
					mensajeError = "el DNI solo debe contener numeros";
				}
				break;
			default: 
				console.log(name);
				break;
		}
		return mensajeError;
	};
	
	const controlador = (evento) => {
		evento.preventDefault();
		const camposVacios = [];
		if(!formValor.nombre) camposVacios.push("nombre");
		if(!formValor.apellido) camposVacios.push("apellido");
		if(!formValor.dni) camposVacios.push("dni");
		if(!formValor.telefono) camposVacios.push("telefono");
		if(!formValor.email) camposVacios.push("correo");

		if (camposVacios > 0) {
			alert(`se necesitan los siguientes campos : ${camposVacios.join(", ")}`);
			return;
		}
		const erroresPresentes = [];
		Object.entries(errores).forEach(([campo, error]) => {
			if (error) erroresPresentes.push(error);
		});
		if (erroresPresentes.length > 0) {
			alert(`errores en los campos: ${erroresPresentes.join(", ")}`);
			return;
		}
		alert("Paciente creado");
	};


  	useEffect(() => {
		fetch(`http://127.0.0.1:8000/pacientes/${valor}/`)
          .then((response) => response.json())
          .then((data) => { 
			  console.log(data)
			  cambiarPaciente(data)})
          .catch((error) => { 
              console.error('ERROR LOCO ERROR :', error)
              cambiarPaciente([])})
	}, [valor]);

  	const historiasMedicas = paciente?.turnos 
		?.filter(turno => turno.estado === "Realizado")
		.sort((a,b) => new Date(b.fecha) - new Date(a.fecha)) || [];
	
	const [abiertoC, abrirC] = useState(false);
	const cerrarCrear = () => abrirC(false);
	const abrirCrear = () => abrirC(true);
	
	const [abiertoE,abrirE] = useState(false);
	const cerrarEditor = () => abrirE(false);
	const abrirEditor = () => abrirE(true);

	return (
		<>
		<Container fixed >
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid size={6} sx={{ position: 'relative' }}>
						<Stack spacing={3} sx={{ mt: 4 }}>
							<Box sx={{ borderBottom: '2px solid lightgray' }}><h1> {paciente.dni}</h1></Box>
							<h3> {paciente.apellido}, {paciente.nombre} </h3>
        	   	            <h5> {paciente.email} </h5>
           		            <h5> {paciente.telefono} </h5>
						</Stack>
						<Button sx={{ position: 'absolute', right: 0, mt: '43vh' }} variant="contained" color="success" onClick={abrirCrear}>
							Nuevo paciente
						</Button>
						<Button sx={{ position: 'absolute', left: 0, mt: '43vh', mr: 5 }} variant="contained" color="warning" onClick={abrirEditor}>
							Editar paciente
						</Button>

						<Modal open={abiertoE} onClose={cerrarEditor} >
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
								width: 700
							}}>
								<form style={{ marginTop: 0 }}>
									<Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'left' }}>
										Editar datos 
									</Typography>
									<TextField 
										sx={{ mt: 2 }}
										id="standard-helperText" 
										label="nuevo nombre" 
										defaultValue={paciente.nombre} 
										variant="standard" 
										fullWidth />
									<TextField 		
										sx={{ mt: 2 }}
										id="standard-helperText" 
										label="nuevo apellido" 
										defaultValue={paciente.apellido} 
										variant="standard" 
										fullWidth />
									<TextField 		
										sx={{ mt: 2 }}
										id="standard-helperText" 
										label="nuevo DNI" 
										defaultValue={paciente.dni} 
										variant="standard" 
										fullWidth />
									<TextField 		
										sx={{ mt: 2 }}
										id="standard-helperText" 
										label="nuevo telefono" 
										defaultValue={paciente.telefono} 
										variant="standard" 
										fullWidth />
									<TextField 		
										sx={{ mt: 2 }}
										id="standard-helperText" 
										label="nuevo correo" 
										defaultValue={paciente.email} 
										variant="standard" 
										fullWidth />

									<Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
										<Button onClick={cerrarEditor}  variant="outlined" color="error">
											Cancelar
										</Button>
										<Button type="submit" variant="contained" color="success">
											Guardar
										</Button>
									</Stack>
								</form>
							</Box>
						</Modal>

						<Modal open={abiertoC} onClose={cerrarCrear} aria-labelledby="modal-title" aria-describedby="modal-description">
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
										label="Correo"
										name="email"
										variant="standard" 
										fullWidth
										value={formValor.email}
										onChange={cambiosForm}
										error={!!errores.email}
									/>
									<Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
										<Button onClick={cerrarCrear}  variant="outlined" color="error">
											Cancelar
										</Button>
										<Button type="submit" variant="contained" color="success">
											Guardar
										</Button>
									</Stack>
								</form>
							</Box>
						</Modal>

					</Grid>
					<Grid size={6}>
						<TableContainer sx={{mt: 6, overflowY: 'auto' }} component={Paper}>
							<Table>
								<TableHead sx={{ backgroundColor: 'lightgray' }}>
									<TableRow >
										<TableCell sx={{ color: "black", fontWeight: "bold" }} > Fecha </TableCell>
										<TableCell sx={{ color: "black", fontWeight: "bold" }} align="center"> Centro </TableCell>
										<TableCell sx={{ color: "black", fontWeight: "bold" }} align="right"> Doctor </TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{historiasMedicas.map((turno) => (
										<TableRow key={turno.id}	sx={{ '&:last-child td, &:last-child th' : { border: 0 } }} >
											<TableCell component="th" scope="row">
												{turno.fecha}
											</TableCell>
											<TableCell align="center">{turno?.agenda?.CentroOdontologico?.nombre}</TableCell>
											<TableCell align="right">{turno?.agenda?.odontologo?.nombre}</TableCell>
            							</TableRow>
          							))}
        						</TableBody>
     						</Table>
 				   		</TableContainer>
					</Grid>
				</Grid>
			</Box>
		</Container>
		</>
	)
}
