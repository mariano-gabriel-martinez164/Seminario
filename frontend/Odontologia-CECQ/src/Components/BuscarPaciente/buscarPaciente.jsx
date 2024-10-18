import React, { useState, useEffect } from 'react'
import './buscarPaciente.css'
import { Button, Container, Table, TableRow, TableHead, TableBody, Paper,TableCell, TableContainer } from '@mui/material';
import { Box, Stack, Modal, TextField, Typography,List, ListItem, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import  MostrarHistorias  from './historias.jsx';
import { SelectorPacientes } from '../MaterialUI/selectores.jsx';
import CrearPaciente from './crearPaciente.jsx';
import EditarPaciente from './editarPaciente.jsx';


export default function buscarPaciente() {
	const [ paciente, cambiarPaciente ] = useState('');
	const [abiertoE,abrirE] = useState(false);
	const cerrarEditor = () => abrirE(false);
	const abrirEditor = () => abrirE(true);
	const [abiertoB, abrirB] = useState(true);
	
	const [abiertoC, abrirC] = useState(false);
	const abrirCrear = () => abrirC(true);
	const cerrarCrear = () => abrirC(false);

	const cerrarModal = () => {
		if (paciente) {
			abrirB(false);
		} else {
			alert('Debe seleccionar un paciente');
		}
	};

	return (
		<>
		<Modal open={abiertoB} onClose={(e, reason) => reason === "backdropClick" ? null : cerrarModal()}>
			<Box sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%,-50%)',
				width: 400,
				backgroundColor: 'white',
				p: 4,
				boxShadow: 24,
				borderRadius: 2
			}}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Seleccionar Paciente
				</Typography>

				<SelectorPacientes
					selectedValue={paciente}
					setSelectedValue={cambiarPaciente}
				/>
					
				<Button 
					variant="contained"
					color="primary"
					fullWidth
					sx={{ mt: 2 }}
					onClick={cerrarModal}
				>
					confirmar
				</Button>
			</Box>
		</Modal>

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
						<CrearPaciente abrir={abiertoC} cerrar={cerrarCrear}/>
						<EditarPaciente abrir={abiertoE} cerrar={cerrarEditor} paciente={paciente}/>
				</Grid>
					<Box sx={{ flexGrow: 1}}>
						<MostrarHistorias paciente={paciente} />
					</Box>
				</Grid>
			</Box>
		</Container>
		</>
	)
}
