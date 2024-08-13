import React from 'react'
import { removeItem } from '../HandleAndRemove/handleAndRemove';
import CloseButton from 'react-bootstrap/CloseButton';

export const mostrarFiltros = (selectedItems, setSelectedItems) => {
  return (
    <div className={`${selectedItems.length === 0 ? 'd-none' : ''}`}> 
        {selectedItems.map((item, index) => ( 
        <div key={index}>
        <br />
        <span className='bg-light rounded m-2'>
        {item} <CloseButton onClick={() => removeItem(selectedItems, setSelectedItems,item)}></CloseButton>
        </span> 
        <br />
        </div>))}
        <br />
    </div>
    )
}
