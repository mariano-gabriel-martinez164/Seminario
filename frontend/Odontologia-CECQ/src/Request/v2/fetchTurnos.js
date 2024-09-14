import { useFetch } from "./fetch";
import { format } from "date-fns";

export default function useFetchTurnos (
    startDate,
    endDate,
    agendaID='',
    odontologoID='',
    centroID='',
    administrativoID='',
    pacienteDNI='',
    sobreTurno=null,
    estados=[],
) {
    const fecha_inicio = format(startDate, 'yyyy-MM-dd');
    const fecha_fin = format(endDate, 'yyyy-MM-dd');
    let url = `/turnos/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`;
    if (agendaID) url += `&id_agenda=${agendaID}`;
    if (odontologoID) url += `&id_odontologo=${odontologoID}`;
    if (centroID) url += `&id_centro=${centroID}`;
    if (administrativoID) url += `&id_administrativo=${administrativoID}`;
    if (pacienteDNI) url += `&id_paciente=${pacienteDNI}`;
    if (sobreTurno != null) url += `&sobreturno=${sobreTurno}`;
    if (estados.length) url += `&estado=` + estados.join('&estado=');

    return useFetch(url);
}