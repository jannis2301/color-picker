import { clipboardIcon, trashIcon } from './svg/icons';
import { copyContent, getElementBySelector } from './utils';

export class Sidebar {
  private el: HTMLElement;
  private colorListElement: HTMLUListElement;

  constructor(el: HTMLElement) {
    this.el = el;
    this.colorListElement = getElementBySelector<HTMLUListElement>(
      '#colorList',
      this.el
    );
    this.init();
  }

  private removeColorFromLocalStorage(color: string): void {
    let existingColors = localStorage.getItem('favoriteColors');
    let colorsArray = existingColors ? JSON.parse(existingColors) : [];

    // Filter out the color to be removed (using plain strings)
    colorsArray = colorsArray.filter((c: string) => c !== color);

    // Update localStorage with the new array
    localStorage.setItem('favoriteColors', JSON.stringify(colorsArray));
  }

  private addColorToList(color: string): void {
    // Check if the color is already in the list
    const existingItems = Array.from(
      this.colorListElement.querySelectorAll('li')
    ).map((item) => item.textContent?.trim() || '');

    if (!existingItems.includes(color)) {
      const newListElement = document.createElement('li');
      const buttonContainer = document.createElement('div');
      const copyButton = document.createElement('button');
      const deleteButton = document.createElement('button');
      newListElement.textContent = color;
      newListElement.style.color = color;
      copyButton.innerHTML = clipboardIcon;
      deleteButton.innerHTML = trashIcon;
      copyButton.title = 'Copy to clipboard';
      deleteButton.title = 'Delete Color';
      buttonContainer.classList.add('buttonContainer');
      copyButton.classList.add('actionButton');
      deleteButton.classList.add('actionButton');
      this.colorListElement.appendChild(newListElement);
      newListElement.appendChild(buttonContainer);
      buttonContainer.appendChild(copyButton);
      buttonContainer.appendChild(deleteButton);
      copyButton.addEventListener('click', () => {
        copyContent(color);
      });
      deleteButton.addEventListener('click', () => {
        // Remove the color from the UI
        this.colorListElement.removeChild(newListElement);

        // Remove the color from localStorage
        this.removeColorFromLocalStorage(color);
      });
    }
  }

  private renderFavoriteColorsItems(): void {
    const existingColors = localStorage.getItem('favoriteColors');

    // Parse the existing data or initialize an empty object if none exists
    const colorsArray: [] = existingColors ? JSON.parse(existingColors) : [];

    this.colorListElement.innerHTML = '';

    for (const color of colorsArray) {
      this.addColorToList(color);
    }
  }

  private addEventListeners(): void {
    // Listen for the custom 'colorSaved' event
    window.addEventListener('colorSaved', (event: Event) => {
      const customEvent = event as CustomEvent; // Explicitly cast to CustomEvent
      const newColor = customEvent.detail.color;
      this.addColorToList(newColor);
    });
  }

  private init(): void {
    this.renderFavoriteColorsItems();
    this.addEventListeners();
  }
}
