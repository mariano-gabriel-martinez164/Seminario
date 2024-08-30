import { useEffect, useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { CustomPrestaciones } from '../Dropdown/Dropdown';
import { handleSelectObject } from '../HandleAndRemove/handleAndRemove';

const MapaPiezas = ({ mapaPiezas, selectedEstado, turno, setSelectedTurnoPieza, selectedTurnoPieza, setButtonColors, buttonColors }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [valor, setValor] = useState('');
  const [prestaciones, setPrestaciones] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // Estado para manejar qué dropdown está abierto

  const handleButtonClick = (buttonValue) => {
    if (selectedButton && selectedButton.codigo === buttonValue) {
      setSelectedButton(null); // Desmarcar si el mismo botón es clickeado
      setOpenDropdown(null); // Cerrar el dropdown si el botón es desmarcado
    } else {
      fetch(`http://127.0.0.1:8000/piezasDentales/${buttonValue}/`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedButton(data);
          setOpenDropdown(buttonValue); // Abrir el dropdown del botón seleccionado
        });
    }
  };

  useEffect(() => {
    valor &&
    fetch(`http://localhost:8000/prestaciones/?search=${valor}`)
      .then((response) => response.json())
      .then((data) => {
        setPrestaciones(data);
      });
  }, [valor, selectedEstado]);

  const handleItemClick = (buttonValue, prestacion) => {
    handleSelectObject(selectedTurnoPieza, setSelectedTurnoPieza, {
      turno: turno,
      pieza: selectedButton,
      prestacion: prestacion
    });

    // Cambiar color del botón a verde
    setButtonColors(prevColors => ({
      ...prevColors,
      [buttonValue]: 'green'
    }));
    
    
    setSelectedButton(null); // Deseleccionar el botón después de hacer la selección
    setOpenDropdown(null); // Cerrar el dropdown después de seleccionar
  };

  return (
    <Container>
      {mapaPiezas.map((linea, indexLinea) => (
        <div key={indexLinea} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          {linea.map((hilera) => {
            const direccion = hilera[0] < hilera[1] ? 1 : -1;
            const botones = [];

            for (let i = hilera[0]; i !== hilera[1] + direccion; i += direccion) {
              botones.push(
                <Dropdown key={i} style={{ margin: '2px', width: '40px' }} show={openDropdown === i}>
                  <Dropdown.Toggle
                    variant="secondary"
                    style={{ width: '100%', backgroundColor: buttonColors[i] || '' }}
                    onClick={() => handleButtonClick(i)}
                  >
                    {i}
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomPrestaciones} prestaciones={prestaciones} setPrestaciones={setPrestaciones} valor={valor} setValor={setValor}>
                    {prestaciones.map((prestacion) => (
                      <Dropdown.Item
                        onClick={() => handleItemClick(i, prestacion)}
                        key={prestacion.codigo}
                      >
                        {prestacion.nombre}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
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
