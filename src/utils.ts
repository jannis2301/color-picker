const throwSelectorError = (selector: string): never => {
  throw new Error(`Element with selector: ${selector} not found`);
};

const getElementBySelector = <E extends Element>(
  selector: string,
  el: Element | Document = document
): E => {
  const field = el.querySelector(selector);
  if (!field) {
    throwSelectorError(selector);
  }

  return field as E;
};

const getElementsBySelectorAll = <E extends Element>(
  selector: string,
  el: Element | Document = document
): NodeListOf<E> => {
  const fields = el.querySelectorAll(selector);

  if (fields.length === 0) {
    throwSelectorError(selector);
  }

  return fields as NodeListOf<E>;
};

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log(`Hex-Color: ${text} copied to clipboard`);
  } catch (e) {
    console.error(`Failed to copy: ${e}`);
  }
};

const setItemLocalStorage = (key: string, value: string) => {
  // Get the existing colors array from localStorage (if any)
  const existingColors = localStorage.getItem(key);

  // Parse the existing data or initialize an empty array if none exists
  let dataArray: string[] = existingColors ? JSON.parse(existingColors) : [];

  // Check if the color already exists in the array
  if (dataArray.includes(value)) {
    console.log('Color already exists:', value);
    return; // Exit the function to prevent adding duplicate color
  }

  // Add the new color to the array
  dataArray.push(value);

  // Convert the updated array back to a JSON string
  const updatedColors = JSON.stringify(dataArray);

  // Save the updated array back to localStorage
  localStorage.setItem(key, updatedColors);

  console.log('Color added:', value);
};

export {
  copyContent,
  getElementBySelector,
  getElementsBySelectorAll,
  setItemLocalStorage,
  throwSelectorError,
};
