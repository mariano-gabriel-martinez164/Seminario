import Dropdown from 'react-bootstrap/Dropdown';
import { CustomMenu, CustomPacientes, CustomToggle, CustomCalendarMenu } from '../DropdownCustom/DropdownCustom';
import { useFetchArray } from '../../../Request/fetch.js';
import { useState } from "react";
import { mostrarFiltros } from "../MostrarFiltros/mostrarFiltros.jsx";
import { CloseButton } from 'react-bootstrap';

export function Filtro({ setSelectedItem, api_url, itemKey, valor1, valor2 }) {
    return (
      <>
        <Dropdown.Menu as={CustomMenu}>
          {useFetchArray(api_url).map((item) => (
            <Dropdown.Item
              onClick={() =>
                setSelectedItem({
                  key: item[itemKey],
                  nombre: item[valor1],
                  apellido: item[valor2] || null,
                })
              }
              key={item[itemKey]}
            >
              {item[valor1]} {valor2 ? item[valor2] : ""}{" "}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </>
    );
}


export function SelectorGenerico({
  selectedItem,
  setSelectedItem,
  api_url,
  itemKey,
  valor1,
  valor2,
  placeholder,
}) {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          {selectedItem.key === "" ? `${placeholder}...` : `${selectedItem.nombre} ${selectedItem.apellido}`}
        </Dropdown.Toggle>
        <Filtro
          setSelectedItem={setSelectedItem}
          api_url={api_url}
          itemKey={itemKey}
          valor1={valor1}
          valor2={valor2}
        />
      </Dropdown>
      <br />
      {mostrarFiltros(selectedItem, setSelectedItem)}
      <br />
    </>
  );
}

export function SelectorOdontologo({ selectedItem, setSelectedItem }) {
  return (
    <SelectorGenerico
      placeholder={"Seleccionar odontólogo"}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      api_url={"/odontologos/"}
      itemKey={"matricula"}
      valor1={"nombre"}
      valor2={"apellido"}
    />
  );
}

export function SelectorCentro({ selectedItem, setSelectedItem }) {
  return (
    <SelectorGenerico
      itemKey={"id"}
      placeholder={"Seleccionar centro"}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      api_url={"/centros/"}
      valor1={"nombre"}
      valor2={""}
    />
  );
}

export function SelectorAdministrativo({ selectedItem, setSelectedItem }) {
  return (
    <SelectorGenerico
      itemKey={"id"}
      placeholder={"Seleccionar administrativo"}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      api_url={"/auth/administrativos/"}
      valor1={"first_name"}
      valor2={"last_name"}
    />
  );
}

export function SelectorAgenda({ selectedItem, setSelectedItem }) {
  return (
    <SelectorGenerico
      itemKey={"id"}
      placeholder={"Seleccionar agenda"}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      api_url={"/agendas/"}
      valor1={"id"}
      valor2={""}
    />
  );
}


export function SelectorPaciente({ selectedItem, setSelectedItem }) {
  const [value, setValue] = useState('');
  
  const pacientes = useFetchArray(`/pacientes/?search=${value}`);
  return (<>
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
        Seleccionar paciente...
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomPacientes} valor={value} setValor={setValue}>
        {pacientes.map((paciente) => (
          <Dropdown.Item
            onClick={() =>
              setSelectedItem({
                key: paciente.dni,
                nombre: paciente.nombre,
                apellido: paciente.apellido,
              })
            }
            key={paciente.dni}
          >
            {paciente.nombre} {paciente.apellido} {paciente.dni ? "" : ""}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    {mostrarFiltros(selectedItem, setSelectedItem)}
    <br />
    </>);
}




export function SelectorRangoDeFechas({ startDate, setStartDate, endDate, setEndDate }) {


  const today = new Date();
  const monthLater = new Date();
  monthLater.setMonth(today.getMonth() + 1);


  const formatDate = (date) => date.toISOString().split('T')[0];
  const areDatesEqual = (date1, date2) => formatDate(date1) === formatDate(date2);
  
  const setDefaultDates = () => {
    console.log('setDefaultDates');
    setStartDate(today);
    setEndDate(monthLater);
  }

  return (<div>
    <Dropdown>
    <Dropdown.Toggle as={CustomToggle}>
      Seleccionar rango de fechas...
    </Dropdown.Toggle>
    <Dropdown.Menu 
      as={CustomCalendarMenu} 
      setStartDate={setStartDate} 
      setEndDate={setEndDate} 
      startDate={startDate} 
      endDate={endDate}
    />
  </Dropdown>
  <span className='bg-light rounded m-2'>
  {formatDate(startDate)} - {formatDate(endDate)}
{(!areDatesEqual(startDate, new Date()) ||
  !areDatesEqual(endDate, monthLater)) && (
  <CloseButton
    onClick={setDefaultDates}
  />)}
  </span>
  <br />
  </div>)
}