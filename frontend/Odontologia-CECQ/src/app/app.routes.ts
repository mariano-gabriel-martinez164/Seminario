// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BuscarTurnoComponent } from './buscar-turno/buscar-turno.component';
import { FacturacionesComponent } from './facturaciones/facturaciones.component';
import { BuscarPacienteComponent } from './buscar-paciente/buscar-paciente.component';
import { VerAgendaComponent } from './ver-agenda/ver-agenda.component'; 
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: VerAgendaComponent },
      { path: 'buscarTurno', component: BuscarTurnoComponent },
      { path: 'facturaciones', component: FacturacionesComponent },
      { path: 'buscarPaciente', component: BuscarPacienteComponent },
    ],
  },
];

