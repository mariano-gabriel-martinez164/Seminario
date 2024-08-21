import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomMenu } from '../Dropdown/Dropdown';
import { useFetch } from '../../Fetchs/fetchs';

export function Filtro({ selectedItem, setSelectedItem, api_url, itemKey, valor1, valor2 }) {
    return (
    <div>
        <Dropdown.Menu as={CustomMenu}>
            {useFetch(api_url).map((item) => (
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

