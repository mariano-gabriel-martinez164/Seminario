export const handleSelect = (selectedItems, setSelectedItems, item) => {
  if (!selectedItems.includes(item)) {
    setSelectedItems([...selectedItems, item]);
  }
};

export const removeItem = (selectedItems, setSelectedItems, item) => {
  setSelectedItems(selectedItems.filter(i => i !== item));
};

export const uniqueArray = (turnos, filterKey) => {
  return Array.from(
    new Map(turnos.map(turno => [turno[filterKey], turno])).values()
  );
};

