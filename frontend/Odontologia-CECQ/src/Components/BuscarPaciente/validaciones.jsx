import { useState, useEffect } from 'react';
import './buscarPaciente.css';
import { usePostData } from '../../Request/v2/post.js';
import { useFetchSearch } from '../../Request/v2/fetch.js';


export default function Validar() {	
	const { postData, errorPost, loadingPost } = usePostData();
	const parseData = (data) => data.results;
	const [ data, loading, error, searchData ] = useFetchSearch('/pacientes/',0, parseData);
	const [formValor, cambiarForm] = useState({
		dni: '',
		nombre: '',
		apellido: '',
		email: '',
		fecha_nacimiento: '',
		telefono: '',
	});

	const [errores,nuevosErrores] = useState({
		nombre: '',
		apellido: '',
		dni: '',
		telefono: '',
		email: '',
		fecha_nacimiento: '',
	});

	const cambiosForm = (e) => {
		const { name, value } = e.target;
		cambiarForm({
			...formValor,
			[name]: value,
		});
		const mensajeError = validarCampo(name, value);
		nuevosErrores((prevErrores) => ({
			...prevErrores,
			[name]: mensajeError,
		}));
	};
	const validarCampo = (name, value) => {
		let mensajeError = '';
		switch(name) {
			case 'nombre':
				if(value.length < 3 ) {
					mensajeError = 'el nombre debe tener un minimo de tres caracteres';
				}
				if(value.length > 12) {
					mensajeError = 'el nombre debe tener un maximo de doce caracteres';
				}
				break;
			case 'apellido':
				if(value.length < 4 ) {
					mensajeError = 'el apellido debe tener un minimo de cuatro caracteres';
				}
				if(value.length > 12) {
					mensajeError = 'el apellido debe tener un maximo de doce caracteres';
				}
				break;
			case 'telefono':
				if(value.length != 10) {
					mensajeError = 'el telefono debe tener 10 numeros';
				}
				break;
			case 'fecha_nacimiento':
				const formato = /^\d{4}-\d{2}-\d{2}$/; 
				const fechaTMP = formato.test(value);
				const fechaHoy = new Date();
				if(!fechaTMP) {
					mensajeError = 'la fecha tiene un formato invalido';
				}
				if (value > fechaHoy) {
					mensajeError = 'la fecha debe ser una fecha pasada';
				}
				break;
			case 'dni':
				const formatoDNI = /^\d{7,8}$/;
				const validarDNI = formatoDNI.test(value);
				if(!validarDNI){
					mensajeError = 'El formato del dni debe cumplir con 7 o 8 numeros';
				}
					break;
		}
		return mensajeError;
	}

	const  controlador = async (evento) => {
    	evento.preventDefault();
	    const camposVacios = [];
 		if (!formValor.nombre) camposVacios.push("Nombre");
    	if (!formValor.apellido) camposVacios.push("Apellido");
    	if (!formValor.telefono) camposVacios.push("Teléfono");
    	if (!formValor.dni) camposVacios.push("DNI");
    	if (!formValor.email) camposVacios.push("Email");
		if (!formValor.fecha_nacimiento) camposVacios.push("Fecha de nacimiento");

    	if (camposVacios.length > 0) {
       		alert(`Se necesitan los siguientes campos: ${camposVacios.join(", ")}`);
        	return;
    	}
    	// Verificar errores de validación
    	const erroresPresentes = [];
    	Object.entries(errores).forEach(([campo, error]) => {
        	if (error) erroresPresentes.push(error);
    	});
    	if (erroresPresentes.length > 0) {
        	alert(`Errores en los campos: ${erroresPresentes.join(", ")}`);
			return;
		}
		else {
			await searchData(formValor.dni);
			if (data.some((pac) => pac.dni === formValor.dni)){
				alert("DNI en uso");
				return;
			}
			try {
				if(!loading && data){
					await postData('/pacientes/', formValor);
					alert("Datos actualizados");
				}
			} catch(error) {
				alert("hubo un problema al enviar los datos: " + error.message);
			}
		}
	};

	return { formValor, errores, cambiosForm, controlador, nuevosErrores };
};


























