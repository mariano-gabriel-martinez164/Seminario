import { useState, useEffect } from 'react';
import { Grid, TableContainer, Table, TableRow, TableHead, TableCell, Paper, TableBody } from '@mui/material';
import { useFetch } from '../../Request/v2/fetch';
import './buscarPaciente.css';

function MostrarHistorias({ paciente }){
	const [historiasMedicas, cambiarHistoriasMedicas] = useState([]);
	const {data, loading, error} = useFetch(`/pacientes/${paciente.dni}/`);
	useEffect(() => {
		if(paciente) {
			const historias = data?.turnos 
				?.filter(turno => turno.estado === "Realizado")
				.sort((a,b) => new Date(b.fecha) - new Date(a.fecha)) || [];
			cambiarHistoriasMedicas(historias)
		}
	},[data]);
	console.log(historiasMedicas);
	return (
		<>
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
		</>
	);
}

export default MostrarHistorias;
