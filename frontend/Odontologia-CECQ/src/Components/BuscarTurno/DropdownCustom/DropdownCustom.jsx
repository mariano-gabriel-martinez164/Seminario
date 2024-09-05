import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DropdownCustom.css';

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    style={{backgroundColor: 'white'}} 
    className="btn btn-outline-dark ms-2 w-100 custom"
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

CustomToggle.displayName = 'CustomToggle';

export const CustomMenu = React.forwardRef(
  ({ children, className, 'aria-labelledby': labeledBy }, ref) => {
    const [valor, setValor] = useState('');

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
          onChange={(e) => setValor(e.target.value)}  // Cambio aquí
          value={valor}  // Cambio aquí
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter((child) => {
            const childText = child.props.children.toString();
            return !valor || childText.toLowerCase().includes(valor.toLowerCase());
          })}
        </ul>
      </div>
    );
  }
);

CustomMenu.displayName = 'CustomMenu';

export const CustomOnlySearch = React.forwardRef(
  ({ children, className, 'aria-labelledby': labeledBy }, ref) => {
    const [valor, setValor] = useState('');

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
          onChange={(e) => setValor(e.target.value)}  // Cambio aquí
          value={valor}  // Cambio aquí
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter((child) => {
            const childText = child.props.children.toString();
            return !valor || childText.toLowerCase().includes(valor.toLowerCase());
          })}
        </ul>
      </div>
    );
  }
);

CustomOnlySearch.displayName = 'CustomOnlySearch';

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

CustomCalendarMenu.displayName = 'CustomCalendarMenu';

export const CustomOnlyMenu = React.forwardRef(
  ({ children, className, 'aria-labelledby': labeledBy }, ref) => {

    return (
      <div
        ref={ref}
        style={{ width: '90%', marginLeft: '3%' }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {children.map((child) => {
            return child
          })}
        </ul>
      </div>
    );
  }
);

CustomOnlyMenu.displayName = 'CustomOnlyMenu';

export const CustomPacientes = React.forwardRef(
  ({children, className, 'aria-labelledby': labeledBy, valor, setValor}, ref) => {
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
          onChange={(e) => {setValor(e.target.value);}}
          value={valor}
        />   
        <ul className="list-unstyled scrollable">
          {children} 
        </ul>
      </div>
    );
  }
);

CustomPacientes.displayName = 'CustomPacientes';

export const CustomPrestaciones = React.forwardRef(
  ({ children, className, 'aria-labelledby': labeledBy, valor, setValor }, ref) => {
    return (
      <div
        ref={ref}
        style={{  marginLeft: '3%' }}
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
        <ul className="list-unstyled scrollable">
          {children} 
        </ul>
      </div>
    );
  }
);

CustomPrestaciones.displayName = 'CustomPrestaciones';
