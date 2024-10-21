import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Divider from '@mui/material/Divider';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import img from '../../../assets/CECQIcon.png';


export function Recivo (
    {origin,
    destination,
    reference,
    dateTime,
    amount}
  ) {
    return (
        <Card elevation={3} sx={{ maxWidth: 400, width: '80%' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
            Comprobante de Venta
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Origen:</Typography>
                  <Typography variant="body1">{origin}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ArrowDownwardIcon/>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Destino:</Typography>
                  <Typography variant="body1">{destination}</Typography>
              </Box>
              <Divider sx={{ my: 2, borderBottomWidth: 2, bgcolor: 'rgba(0, 0, 0, 0.3)' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Tratamiento:</Typography>
                  <Typography variant="body1">{reference}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="medium">Monto:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon fontSize="small" color="action" />
                  <Typography variant="body1">{amount}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Fecha:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="body1">{dateTime}</Typography>
                  </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                  variant="contained"
                  startIcon={<PictureAsPdfIcon />}
              >
                  Descargar PDF
              </Button>
            </Box>
          </CardContent>
        </Card>
    );
  }
  
  
export function RecivoPDF (
    {origin,
    destination,
    reference,
    dateTime,
    amount}
  ) {
    return (
        <Card elevation={3} sx={{ maxWidth: 400, width: '80%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexGrow: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Box
                component="img"
                src={img}
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
              <Typography variant="h3" component="h2" fontWeight="bold">
                CECQ
              </Typography>
            </Box>
            <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
            Comprobante de Venta
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Origen:</Typography>
                  <Typography variant="body1">{origin}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ArrowDownwardIcon/>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Destino:</Typography>
                  <Typography variant="body1">{destination}</Typography>
              </Box>
              <Divider sx={{ my: 2, borderBottomWidth: 2, bgcolor: 'rgba(0, 0, 0, 0.3)' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Tratamiento:</Typography>
                  <Typography variant="body1">{reference}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="medium">Monto:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon fontSize="small" color="action" />
                  <Typography variant="body1">{amount}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Fecha:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="body1">{dateTime}</Typography>
                  </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
    );
  }
  