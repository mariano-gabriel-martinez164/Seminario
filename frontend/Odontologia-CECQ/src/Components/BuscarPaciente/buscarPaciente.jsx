import React, { useState, useEffect } from 'react'
import './buscarPaciente.css'

import { Button, Container, Table, TableRow, TableHead, TableBody, Paper,TableCell, TableContainer } from '@mui/material';
import { Box, Stack, Modal, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

export default function buscarPaciente() {

	const [ paciente, cambiarPaciente ] = useState([]);
	const [ nombre, nuevoNombre ] = useState('');
	const [ apellido, nuevoApellido ] = useState('');
	const [ dni, nuevoDni ] = useState('');
	const [ telefono, nuevoTelefono ] = useState('');
	const [ email, nuevoEmail ] = useState('');
	const valor = 11111111

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
	
		const [open, setOpen] = useState(false);
		const handleClose = () => setOpen(false);
		const handleOpen = () => setOpen(true);

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
						<Button sx={{ position: 'absolute', right: 0, mt: '43vh' }} variant="contained" color="success" onClick={handleOpen}>
							Nuevo paciente
						</Button>
						<Button sx={{ position: 'absolute', left: 0, mt: '43vh', mr: 5 }} variant="contained" color="warning" onClick={handleOpen}>
							Editar paciente
						</Button>

						<Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
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
								<form style={{ marginTop: 0 }}>
									<Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'left' }}>
										Nuevo paciente 
									</Typography>
									<TextField id="standard-basic" label="Nombre" variant="standard" fullWidth />
									<TextField id="standard-basic" label="Apellido" variant="standard" fullWidth />
									<TextField id="standard-basic" label="DNI" variant="standard" fullWidth />
									<TextField id="standard-basic" label="Telefono" variant="standard" fullWidth />
									<TextField id="standard-basic" label="Correo" variant="standard" fullWidth />
									<Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
										<Button onClick={handleClose}  variant="outlined" color="error">
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
