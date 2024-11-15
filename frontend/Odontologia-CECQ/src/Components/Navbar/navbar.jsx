import './navbar.css';
import img from '../../assets/CECQIcon.png';
import { useAuth } from '../Login/authContext';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material/";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { DrawerHeader, AppBar, Drawer } from './navbarEstilos';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonSearch from '@mui/icons-material/PersonSearch';
import ManageSearch from '@mui/icons-material/ManageSearch';
import FeedIcon from '@mui/icons-material/Feed';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import { ModalCambiarContraseña } from './Modal/modalCambiarContraseña';
import { useFetchUser } from '../../Request/v2/fetchUser'; 
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {

  const { logout } = useAuth();
  const { nombre, apellido, admin, loading } = useFetchUser(); 

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#343a40' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 5 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <img src={img} alt="..." id="img-icon-brand" />
            <Typography variant="h6" component="a" sx={{ ml: 1 }} id='CECQ'>
              CECQ
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              id="basic-button"
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color: '#fff' }}
            >
              <AccountCircle />
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem disabled onClick={handleCloseMenu} sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ marginRight: 1 }} />
                {loading ? 'Cargando...' : `Nombre: ${nombre}`}
              </MenuItem>
              <MenuItem disabled onClick={handleCloseMenu} sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ marginRight: 1 }} />
                {loading ? 'Cargando...' : `Apellido: ${apellido}`}
              </MenuItem>
              <MenuItem onClick={handleOpenModal} sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenIcon sx={{ marginRight: 1 }} /> Cambiar contraseña
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center' }}>
                <LogoutIcon sx={{ marginRight: 1 }} /> Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{ '& .MuiDrawer-paper': { backgroundColor: '#f1f3f5' } }}
      >
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
        {admin && (
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
        )}
      </Drawer>

      <ModalCambiarContraseña open={openModal} onClose={handleCloseModal} />
    </>
  );
}

function DrawerItem({ icon, text, link, setOpen }) {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={Link}
        to={link}
        onClick={() => setOpen(false)}
        sx={[{ minHeight: 48, px: 2.5 }, { justifyContent: 'initial' }]}
      >
        <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center' }, { mr: 3 }]}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: 1 }} />
      </ListItemButton>
    </ListItem>
  );
}
