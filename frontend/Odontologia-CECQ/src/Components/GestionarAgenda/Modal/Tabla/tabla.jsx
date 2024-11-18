import { Stack, Box, Divider, Paper, useMediaQuery, useTheme } from '@mui/material/';
import TurnoBoxv2 from './turnoBoxv2';
import { deleteData } from '../../../../Request/delete';

export default function Tabla({ turnosPorDia, setEstado }) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // true si el ancho es menor a 750px

  // Función que devuelve los días, con nombres completos o abreviados según el tamaño de pantalla
  const getDayHeaders = () => {
    const days = isSmallScreen 
      ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'] // Abreviados para pantallas pequeñas
      : ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']; // Completos para pantallas grandes

    return days.map((day, index) => (
      <Box
        key={index}
        sx={{
          flex: 1,
          pt: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: { xs: '12px', sm: '16px', md: '18px' }, // Tamaño de fuente adaptable
          whiteSpace: 'nowrap', // Evita que se rompa el texto
        }}
      >
        <h3>{day}</h3>
      </Box>
    ));
  };

  const handleDelete = (turnoId) => {
    deleteData(`/turnotemplates/${turnoId}/`);
  };

  const getTurnos = () => {
    return Object.keys(turnosPorDia).map((dia, index) => {
      // Ordenar los turnos por horaInicio
      const turnosOrdenados = turnosPorDia[dia].sort((a, b) => {
        const [aHoras, aMinutos] = a.horaInicio.split(':').map(Number);
        const [bHoras, bMinutos] = b.horaInicio.split(':').map(Number);

        if (aHoras !== bHoras) {
          return aHoras - bHoras;
        }
        return aMinutos - bMinutos;
      });

      return (
        <Box key={index} sx={{ flex: 1, p: 1 }}>
          <TurnoBoxv2 turnos={turnosOrdenados} handleDelete={handleDelete} setEstado={setEstado} />
        </Box>
      );
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#343a40',
          color: 'white',
          borderRadius: '5px 5px 0 0',
          flexWrap: 'wrap', // Para permitir que los días se ajusten en pantallas pequeñas
        }}
      >
        {getDayHeaders()}
      </Stack>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
        sx={{
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '50vh',
          flexWrap: 'wrap', // Para que los turnos también se ajusten
        }}
      >
        {getTurnos()}
      </Stack>
    </Paper>
  );
}
