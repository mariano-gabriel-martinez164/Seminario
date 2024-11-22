import React, { useState, useEffect } from 'react'
import './buscarPaciente.css'
import { Button, Container, Table, TableRow, TableHead, TableBody, Paper, TableCell, TableContainer, Box, Stack, Modal, TextField, Typography,List, ListItem, Autocomplete, IconButton, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import  MostrarHistorias  from './historias.jsx';
import { SelectorPacientes } from '../MaterialUI/selectores.jsx';
import CrearPaciente from './Modal/crearPaciente.jsx';
import EditarPaciente from './Modal/editarPaciente.jsx';
import { useMultipleFetch } from '../../Request/v2/fetch';


export default function buscarPaciente() {
	const [ paciente, cambiarPaciente ] = useState('');
	const [abiertoE,abrirE] = useState(false);
	const abrirEditor = () => abrirE(true);
	const [abiertoB, abrirB] = useState(false);
	const [abiertoC, abrirC] = useState(false);
	const abrirCrear = () => abrirC(true);
	const cerrarCrear = () => abrirC(false);
	const [data, loading, error, fetchData] = useMultipleFetch();
	const cerrarEditor = () => {		
		abrirE(false);
		console.log(paciente.dni);
		fetchData(`/pacientes/${paciente.dni}/`);
	}

	useEffect(() => {
		console.log('data es:', data);
		cambiarPaciente(data);
	},[data])

	const cerrarNuevo = () => {
		cambiarPaciente('');
		abrirB(false);
	};
	const controladorNuevo = (nuevoPaciente) => {
		if(nuevoPaciente) {
			cambiarPaciente(nuevoPaciente);
			abrirB(true);
		}
	};

	return (
		<>
		<Container fixed >				
			<SelectorPacientes
				selectedValue={paciente}
				setSelectedValue={controladorNuevo}
				sx={{ mt: 2 }}
			/>	
	
			<Fab 
				sx={{ position: "fixed", bottom:16, right: 16  }} 
				variant="extended" 
				color="primary" 
				onClick={abrirCrear}>
				<AddIcon sx={{ mr: 1 }} />
				Crear paciente
			</Fab>
			<CrearPaciente abrir={abiertoC} cerrar={cerrarCrear}/>
			
			<Modal open={abiertoB} onClose={cerrarNuevo} aria-labelledby="modal-title" aria-describedby="modal-description">
				<Box sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					backgroundColor: 'white',
					width: '100%',
					height: '100%',
					p: 4,
					boxShadow: 24,
					borderRadius: 2
				}}>
				<IconButton onClick={cerrarNuevo} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
					<CloseIcon />
				</IconButton>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={2}>
							<Grid size={6} sx={{ position: 'relative' }}>
								<Stack spacing={3} sx={{ mt: 4 }}>
									<Box sx={{ borderBottom: '2px solid lightgray' }}><h1> {paciente.dni}</h1></Box>
									<h3> {paciente.apellido}, {paciente.nombre} </h3>
        	   		       	     	<h5> {paciente.email} </h5>
									<h5> {paciente.telefono} </h5>
								</Stack>
							<Button sx={{ position: 'absolute', left: 0, mt: '43vh', mr: 5 }} variant="contained" color="warning" onClick={abrirEditor}>
									Editar paciente
								</Button>					
								<EditarPaciente abrir={abiertoE} cerrar={cerrarEditor} paciente={paciente}/>
							</Grid>
							<Box sx={{ flexGrow: 1}}>
								<MostrarHistorias paciente={paciente} />
							</Box>
						</Grid>
					</Box>
				</Box>
			</Modal>
		</Container>
		</>
	)
}
