import './navbar.css';
import img from '../../assets/CECQIcon.png';
import { useAuth } from '../Login/authContext';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {Box, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { DrawerHeader, AppBar, Drawer } from './navbarEstilos';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonSearch from '@mui/icons-material/PersonSearch';
import ManageSearch from '@mui/icons-material/ManageSearch';
import FeedIcon from '@mui/icons-material/Feed';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DescriptionIcon from '@mui/icons-material/Description';

export default function Navbar() {
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    window.location.href = '/'; 
  };

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" open={open} sx={{backgroundColor: '#343a40'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
          <MenuIcon/>
          </IconButton>
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <img src={img} alt="..." id="img-icon-brand"/>
            <Typography variant="h6" component="a" sx={{ ml: 1 }} id='CECQ'>
              CECQ
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="user account" data-bs-toggle="dropdown">
              <i className="bi bi-person-fill-down fs-3"></i>
            </IconButton>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Nombre:</a></li>
              <li><a className="dropdown-item" href="#">Apellido:</a></li>
              <li><a className="dropdown-item" href="#">Cambiar contraseña</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a></li>
            </ul>
          </Box>
        </Toolbar>
      </AppBar >
      <Drawer variant="permanent" open={open} 
        sx={{ 
          '& .MuiDrawer-paper': { 
            backgroundColor: '#f1f3f5',
          },
        }}>
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List  >
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton to="/verAgenda" sx={[{minHeight: 48, px: 2.5,},
                open? {justifyContent: 'initial',}: {justifyContent: 'center',},]}>
                <ListItemIcon sx={[{minWidth: 0,justifyContent: 'center',},
                  open? {mr: 3,}: {mr: 'auto',},]}>
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText primary='Ver agenda' sx={[
                    open? {opacity: 1,}: {opacity: 0,},]}/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton to="/Buscarturno" sx={[{minHeight: 48, px: 2.5,},
                open? {justifyContent: 'initial',}: {justifyContent: 'center',},]}>
                <ListItemIcon sx={[{minWidth: 0,justifyContent: 'center',},
                  open? {mr: 3,}: {mr: 'auto',},]}>
                  <ManageSearch />
                </ListItemIcon>
                <ListItemText primary='Buscar turno' sx={[
                    open? {opacity: 1,}: {opacity: 0,},]}/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton to="/buscarPaciente" sx={[{minHeight: 48, px: 2.5,},
                open? {justifyContent: 'initial',}: {justifyContent: 'center',},]}>
                <ListItemIcon sx={[{minWidth: 0,justifyContent: 'center',},
                  open? {mr: 3,}: {mr: 'auto',},]}>
                  <PersonSearch />
                </ListItemIcon>
                <ListItemText primary='Buscar paciente' sx={[
                    open? {opacity: 1,}: {opacity: 0,},]}/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton to="/facturaciones" sx={[{minHeight: 48, px: 2.5,},
                open? {justifyContent: 'initial',}: {justifyContent: 'center',},]}>
                <ListItemIcon sx={[{minWidth: 0,justifyContent: 'center',},
                  open? {mr: 3,}: {mr: 'auto',},]}>
                  <FeedIcon />
                </ListItemIcon>
                <ListItemText primary='Facturacion' sx={[
                    open? {opacity: 1,}: {opacity: 0,},]}/>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List >
        
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton to="/gestionarUsuario" sx={[{minHeight: 48, px: 2.5,},
                open? {justifyContent: 'initial',}: {justifyContent: 'center',},]}>
                <ListItemIcon sx={[{minWidth: 0,justifyContent: 'center',},
                  open? {mr: 3,}: {mr: 'auto',},]}>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary='Gestionar usuarios' sx={[
                  open? {opacity: 1,}: {opacity: 0,},]}/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton to="/gestionarAgenda" sx={[{minHeight: 48, px: 2.5,},
                open? {justifyContent: 'initial',}: {justifyContent: 'center',},]}>
                <ListItemIcon sx={[{minWidth: 0,justifyContent: 'center',},
                  open? {mr: 3,}: {mr: 'auto',},]}>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary='Gestionar agendas' sx={[
                  open? {opacity: 1,}: {opacity: 0,},]}/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton to="/gestionarPrestacion" sx={[{minHeight: 48, px: 2.5,},
                open? {justifyContent: 'initial',}: {justifyContent: 'center',},]}>
                <ListItemIcon sx={[{minWidth: 0,justifyContent: 'center',},
                  open? {mr: 3,}: {mr: 'auto',},]}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary='Gestionar prestaciones' sx={[
                  open? {opacity: 1,}: {opacity: 0,},]}/>
              </ListItemButton>
            </ListItem>
          </List>
      </Drawer>
    </>
  );
}



