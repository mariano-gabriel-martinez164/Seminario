import React, { useState } from 'react';
import './buscarTurno.css'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

export default function buscarTurno() {
  const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      }
    ]);
  
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a className="btn btn-outline-secondary ms-2 w-100"
      href=""
      ref={ref} //<a> se comporta como un dropdown.toggle que es pasado como ref
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}  &#x25bc; 
      
    </a> //children contiene al texto que muestra dropdown.toggle
  ));

  const CustomMenu = React.forwardRef(
  ({ children,className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');
    
    return (
      <div
      ref={ref}
      style={{width: '90%', marginLeft: '3%'}}
      className={className}
      aria-labelledby={labeledBy}
      >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Buscar..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );



const customCalendarMenu = React.forwardRef(
  ({className, 'aria-labelledby': labeledBy }, ref) => {
    return(
      <div
        ref={ref}
        className={className}
        aria-labelledby={labeledBy}
      >
        <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        />
      </div>
      );
    },
  );

  const CustomSoloMenu = React.forwardRef(
    ({ children,className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
      
      return (
        <div
        ref={ref}
        style={{width: '90%', marginLeft: '3%'}}
        className={className}
        aria-labelledby={labeledBy}
        >
            <ul className="list-unstyled">
              {React.Children.toArray(children).filter(
                (child) =>
                  !value || child.props.children.startsWith(value),
              )}
            </ul>
          </div>
        );
      },
  );

  return (
  
    <Container id='container' fluid>
        <Row>
          
          <Col id='col1' xs={2} >
              <Row id='row'>
                <h2 id='h2'>Turnos</h2>
              </Row>
              <Row>
                <h6>Paciente</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar paciente...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item eventKey="1">Mariano</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Tomas</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Juan</Dropdown.Item>
                    <Dropdown.Item eventKey="1">Santi</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <br /><br />

                <h6>Odontologo</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
                    Seleccionar odontologo...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item eventKey="1">Mariano</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Tomas</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Juan</Dropdown.Item>
                    <Dropdown.Item eventKey="1">Santi</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br /><br />

                <h6>Estado</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
                    Seleccionar estado...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomSoloMenu}>
                    <Dropdown.Item eventKey="1">Completado</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Pendiente</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br /><br />
                
                <h6>Duracion</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
                    Seleccionar duracion...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomSoloMenu}>
                    <Dropdown.Item eventKey="1">15 minutos</Dropdown.Item>
                    <Dropdown.Item eventKey="2">30 minutos</Dropdown.Item>
                    <Dropdown.Item eventKey="3">45 minutos</Dropdown.Item>
                    <Dropdown.Item eventKey="4">60 minutos</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br /><br />
                <h6>Rango de fechas</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
                    Seleccionar rango de fechas...
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={customCalendarMenu}></Dropdown.Menu>
                </Dropdown>
                <br /><br />
              </Row>
            
          </Col>
          <Col id='col2' xs={8} >
            <Form>
              <Form.Control className='my-3'
                placeholder='Buscar turno'
                />
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Duracion</th>
                  <th>Fecha de inicio</th>
                  <th>Paciente</th>
                  <th>Odontologo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30 minutos</td>
                  <td>10/08/2024</td>
                  <td>Tomas</td>
                  <td>Mariano</td>
                  <td>Completado</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
  

  )
}
