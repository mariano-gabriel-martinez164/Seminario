export const handleSelect = (selectedItems, setSelectedItems, item) => {
  if (!selectedItems.includes(item)) {
    setSelectedItems([...selectedItems, item]);
  }
};

export const removeItem = (selectedItems, setSelectedItems, item) => {
  setSelectedItems(selectedItems.filter(i => i !== item));
};
