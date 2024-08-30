export const handleSelect = (selectedItems, setSelectedItems, item) => {
  if (!selectedItems.includes(item)) {
    setSelectedItems([...selectedItems, item]);
  }
};


export const handleSelectObject = (selectedItems = [], setSelectedItems, item) => {

  const itemExists = selectedItems.some(existingItem => 
    existingItem.turno === item.turno &&
    existingItem.pieza === item.pieza &&
    existingItem.prestacion === item.prestacion
  );

  if (!itemExists) {
    setSelectedItems(prevItems => [...prevItems, item]);
  }
};

export const removeItem = (selectedItems, setSelectedItems, item, setButtonColors, buttonColors) => {
  const updatedItems = selectedItems.filter(i => i !== item);
  setSelectedItems(updatedItems);

  { buttonColors &&
    setButtonColors(prevColors => {
      const newColors = { ...prevColors };
      const buttonKey = item.pieza.codigo;
      delete newColors[buttonKey];
      return newColors;
    });
  }
};


export const uniqueArray = (turnos, filterKey) => {
  return Array.from(
    new Map(turnos.map(turno => [turno[filterKey], turno])).values()
  );
};