import '../Navbar/navbar.css';
import img from '../../assets/CECQIcon.png';
import Box from "@mui/material/Box"; 
import Toolbar from "@mui/material/Toolbar"; 
import Typography from "@mui/material/Typography"; 
import { AppBar } from '../Navbar/navbarEstilos';  

export default function SimpleNavbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#343a40' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          {/* Icono a la izquierda */}
          <img src={img} alt="CECQ Icon" id="img-icon-brand" />
          {/* Texto CECQ */}
          <Typography variant="h6" component="a" sx={{ ml: 1 }} id="CECQ">
            CECQ
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}