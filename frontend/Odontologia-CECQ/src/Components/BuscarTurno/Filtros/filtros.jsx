import Dropdown from 'react-bootstrap/Dropdown';
import { CustomMenu } from '../DropdownCustom/DropdownCustom';
import { useFetchArray } from '../../../Request/fetch.js';

export function Filtro({ setSelectedItem, api_url, itemKey, valor1, valor2 }) {
    return (
    <div>
        <Dropdown.Menu as={CustomMenu}>
            {useFetchArray(api_url).map((item) => (
                <Dropdown.Item onClick = {() => setSelectedItem(
                    {   key: item[itemKey], 
                        nombre: item[valor1], 
                        apellido: item[valor2] || null
                    })} 
                    key={item[itemKey]} >{item[valor1]} {valor2 ? item[valor2] : ''} </Dropdown.Item>))}
            </Dropdown.Menu>       
        </div>
    );
}

export function FiltroAnidado({ setSelectedItem, api_url, itemKey, itemKey2, valor1, valor11, valor2, valor22 }) {
    return (
    <div>
        <Dropdown.Menu as={CustomMenu}>
            {useFetchArray(api_url).map((item) => (
                <Dropdown.Item onClick = {() => setSelectedItem(
                    {   key: item[itemKey][itemKey2], 
                        nombre: item[valor1][valor11], 
                        apellido: item[valor2][valor22] || null
                    })} 
                    key={item[itemKey][itemKey2]} >{item[valor1][valor11]} {valor2 ? item[valor2][valor22] : ''} </Dropdown.Item>))}
            </Dropdown.Menu>       
        </div>
    );
}