import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Dropdown.css';

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    style={{backgroundColor: 'white'}} 
    className="btn btn-outline-secondary ms-2 w-100 custom"
    href=""
    ref={ref} // <a> se comporta como un dropdown.toggle que es pasado como ref
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a> // children contiene al texto que muestra dropdown.toggle
));

export const CustomMenu = React.forwardRef(
  ({ children, className, 'aria-labelledby': labeledBy }, ref) => {
    const [valor, setvalor] = useState('');

    return (
      <div
        ref={ref}
        style={{ width: '90%', marginLeft: '3%' }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          style={{width: '90%'}}
          autoFocus
          className="mx-3 my-2"
          placeholder="Buscar..."
          onChange={(e) => setvalor(e.target.valor)}
          valor={valor}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter((child) => {
          // Convertir child.props.children a una cadena
          const childText = child.props.children.toString();
          return !valor || childText.startsWith(valor);
          })}
        </ul>
      </div>
    );
  }
);

export const CustomCalendarMenu = React.forwardRef(
  ({ className, 'aria-labelledby': labeledBy, setStartDate, setEndDate, startDate, endDate }, ref) => {
    const today = new Date();
    const maxRangeEndDate = new Date();
    maxRangeEndDate.setMonth(today.getMonth() + 1);

    const [state, setState] = useState([
      {
        startDate: today,
        endDate: maxRangeEndDate,
        key: 'selection',
      },
    ]);

    useEffect(() => {
      setState([{ startDate, endDate, key: 'selection' }]);
    }, [startDate, endDate]); //Cuando se apreta close button, se actualiza el estado y ejecute el useEffect

    const handleSelect = (ranges) => {
      const { startDate, endDate } = ranges.selection;
      const maxAllowedEndDate = new Date(startDate);
      
      maxAllowedEndDate.setMonth(startDate.getMonth() + 1);
      
      if (endDate > maxAllowedEndDate) {
        setState([{ ...ranges.selection, endDate: maxAllowedEndDate }]);
        setStartDate(startDate);
        setEndDate(maxAllowedEndDate);
      } else {
        setState([ranges.selection]);
        setStartDate(startDate);
        setEndDate(endDate);
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        aria-labelledby={labeledBy}
      >
        <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
    );
  }
);


export const CustomOnlyMenu = React.forwardRef(
  ({ children, className, 'aria-labelledby': labeledBy }, ref) => {
    const [valor, setvalor] = useState('');

    return (
      <div
        ref={ref}
        style={{ width: '90%', marginLeft: '3%' }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) => !valor || child.props.children.startsWith(valor)
          )}
        </ul>
      </div>
    );
  }
);

export const CustomPacientes = React.forwardRef(
  ({ className, 'aria-labelledby': labeledBy, valor, setValor, pacientes, setPacientes }, ref) => {
  useEffect(() => {
    // Limpiar el timeout anterior
    const handler = setTimeout(() => {
      if (valor) {
        fetch(`http://127.0.0.1:8000/pacientes/?search=${valor}`)
          .then((response) => response.json())
          .then((data) => {
            setPacientes(data.results);
          });
      } else {
        setPacientes([]);
      }
    }, 3000); // Retraso de 3 segundos

    // Limpiar el timeout si el valor cambia antes de que se ejecute
    return () => {
      clearTimeout(handler);
    };
  }, [valor, setPacientes]);

    return (
      <div
        ref={ref}
        style={{ width: '90%', marginLeft: '3%' }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          style={{ width: '90%' }}
          autoFocus
          className="mx-3 my-2"
          placeholder="Buscar..."
          onChange={(e) => setValor(e.target.value)}
          value={valor}
        />
        <ul className="list-unstyled">
          {pacientes.filter((item) => {
            // Convertir los valores de nombre, apellido, dni a cadenas
            const itemText = item.nombre.toString();
            const itemText2 = item.apellido.toString() 
            const itemKey = item.dni.toString();
            // Filtrar pacientes según el valor
            return itemText.startsWith(valor) || itemText2.startsWith(valor) || itemKey.startsWith(valor);
          }).map((item) => (
            <li key={item.dni} className="mx-3 my-2">
              {item.nombre} {item.apellido}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);