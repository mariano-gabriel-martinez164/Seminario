import './navbar.css';
import img from '../../assets/CECQIcon.png';
import { useAuth } from '../Login/authContext';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { DrawerHeader, AppBar, Drawer } from './navbarEstilos';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonSearch from '@mui/icons-material/PersonSearch';
import ManageSearch from '@mui/icons-material/ManageSearch';
import FeedIcon from '@mui/icons-material/Feed';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import { useFetchUser } from "../../Request/v2/fetchUser.js";
import { ModalCambiarContraseña } from './Modal/modalCambiarContraseña';


export default function Navbar() {

  const { user, loading } = useFetchUser(2);
  useEffect(() => {
  }, [user]);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
              <li>
                <p className="dropdown-item">
                  {loading ? 'Cargando...' : `Nombre: ${user?.first_name || 'Nombre'}`}
                </p>
              </li>
              <li>
                <p className="dropdown-item">
                  {loading ? 'Cargando...' : `Apellido: ${user?.last_name || 'Apellido'}`}
                </p>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleOpenModal}>
                  Cambiar contraseña
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a></li>
            </ul>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#f1f3f5',
          },
        }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <DrawerItem
            icon={<EventAvailableIcon />}
            text='Ver agenda'
            link='/verAgenda'
            setOpen={setOpen}
          />

          <DrawerItem
            icon={<ManageSearch />}
            text='Buscar turno'
            link='/Buscarturno'
            setOpen={setOpen}
          />

          <DrawerItem
            icon={<PersonSearch />}
            text='Buscar paciente'
            link='/buscarPaciente'
            setOpen={setOpen}
          />

          <DrawerItem
            icon={<FeedIcon />}
            text='Facturación'
            link='/facturaciones'
            setOpen={setOpen}
          />
        </List>
        <Divider />
        <List>
          <DrawerItem
            icon={<ManageAccountsIcon />}
            text='Gestionar usuarios'
            link='/gestionarUsuario'
            setOpen={setOpen}
          />

          <DrawerItem
            icon={<AssignmentTurnedInIcon />}
            text='Gestionar agendas'
            link='/gestionarAgenda'
            setOpen={setOpen}
          />

          <DrawerItem
            icon={<DescriptionIcon />}
            text='Gestionar Prestaciones'
            link='/gestionarPrestacion'
            setOpen={setOpen}
          />
        </List>
      </Drawer>
      <ModalCambiarContraseña open={openModal} onClose={handleCloseModal} />
    </>
  );
}

function DrawerItem({icon, text, link, setOpen}) {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton 
        component={Link} 
        to={link} 
        onClick={() => setOpen(false)}
        sx={[{minHeight: 48, px: 2.5,},{justifyContent: 'initial',}]}>
        <ListItemIcon sx={[{minWidth: 0,justifyContent: 'center',},
          {mr: 3,}]}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={[{opacity: 1,}]}/>
      </ListItemButton>
    </ListItem>
  );
}
