import { removeItem } from '../HandleAndRemove/handleAndRemove';
import CloseButton from 'react-bootstrap/CloseButton';


export const mostrarFiltros = (selectedItem, setSelectedItem) => {
  // Verificar si `selectedItem` está vacío o nulo
  if (selectedItem === null || selectedItem.key === '') return null;
  return (
    <div>
      <br />
        <span className='bg-light rounded m-2'>
          {selectedItem === false ? (
            <>
            No
            <CloseButton onClick={() => setSelectedItem(null)}></CloseButton>
            </>
           
          ) : selectedItem === true ? (
            <>
            Si
            <CloseButton onClick={() => setSelectedItem(null)}></CloseButton>
          </>
          ) : (
            <>
              {selectedItem.nombre} {selectedItem.apellido}
              <CloseButton onClick={() => setSelectedItem({key: ''})}></CloseButton>
            </>
          )}

        </span>
      <br /><br />
    </div>
  );
};



export const mostrarFiltrosArray = (selectedItems, setSelectedItems, setButtonColors, buttonColors) => {
  return (
    <div className={`${selectedItems.length === 0 ? 'd-none' : ''}`}>
      {selectedItems.map((item, index) => (
        <div key={index}>
          <br />
          <span className='bg-light rounded m-2'>
            {typeof item === 'object' 
              ? `Pieza dental: (${item?.pieza?.codigo}) ${item?.pieza?.nombre} - ${item.prestacion.nombre}` 
              : item
            }
            <CloseButton onClick={() => removeItem(selectedItems, setSelectedItems, item, setButtonColors, buttonColors)}></CloseButton>
          </span>
          <br />
        </div>
      ))}
      <br />
    </div>
  );
};


