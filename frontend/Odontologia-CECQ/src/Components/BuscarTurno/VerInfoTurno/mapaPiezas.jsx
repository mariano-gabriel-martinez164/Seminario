import React, { useEffect, useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { CustomMenu } from '../Dropdown/Dropdown';

const MapaPiezas = ({ mapaPiezas, selectedEstado }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonValue) => {
    setSelectedButton(selectedButton === buttonValue ? null : buttonValue);
  };

  const [prestaciones, setPrestaciones] = useState([]);

  useEffect(() => {
    
      fetch('http://localhost:8000/prestaciones/')
        .then((response) => response.json())
        .then((data) => {
          setPrestaciones(data);
        }
      );
  }, [selectedEstado]);

  return (
    <Container>
      {mapaPiezas.map((linea, indexLinea) => (
        <div key={indexLinea} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          {linea.map((hilera, indexHilera) => {
            const direccion = hilera[0] < hilera[1] ? 1 : -1;
            const botones = [];

            for (let i = hilera[0]; i !== hilera[1] + direccion; i += direccion) {
              botones.push(
                <Dropdown key={i} style={{ margin: '2px', width: '40px' }}>
                  <Dropdown.Toggle
                    variant="secondary"
                    style={{ width: '100%' }}
                    onClick={() => handleButtonClick(i)}
                  >
                    {/* {i} */}
                  </Dropdown.Toggle>

                  {selectedButton === i && (
                    
                    <Dropdown.Menu show as={CustomMenu}>
                      {prestaciones.map((prestacion) => (
                        <Dropdown.Item
                          key={prestacion.codigo}
                        >
                          {prestacion.nombre}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              );
            }

            return botones;
          })}
        </div>
      ))}
    </Container>
  );
};

export default MapaPiezas;
