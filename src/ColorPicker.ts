import { hexToRgb, rgbaToHex } from './helpers';
import {
  copyContent,
  getElementBySelector,
  setItemLocalStorage,
} from './utils';

export class ColorPicker {
  private el: HTMLElement;
  private colorInputElement: HTMLInputElement;
  private hexValueElement: HTMLElement;
  private rgbValueElement: HTMLElement;
  private colorPickerButton: HTMLButtonElement;
  private saveColorButton: HTMLButtonElement;
  private copyColorButton: HTMLButtonElement;
  private colorValue: string;

  constructor(el: HTMLElement) {
    this.el = el;
    this.colorInputElement = getElementBySelector<HTMLInputElement>(
      '#colorInput',
      this.el
    );
    this.colorPickerButton = getElementBySelector<HTMLButtonElement>(
      '#colorPicker',
      this.el
    );
    this.saveColorButton = getElementBySelector<HTMLButtonElement>(
      '#saveColor',
      this.el
    );
    this.copyColorButton = getElementBySelector<HTMLButtonElement>(
      '#copyColor',
      this.el
    );

    this.hexValueElement = getElementBySelector<HTMLElement>(
      '#hexValue',
      this.el
    );
    this.rgbValueElement = getElementBySelector<HTMLElement>(
      '#rgbValue',
      this.el
    );

    this.colorValue = this.colorInputElement.value || '#000000';

    this.handleInput = this.handleInput.bind(this);
    this.handleColorPicker = this.handleColorPicker.bind(this);
    this.handleSaveColor = this.handleSaveColor.bind(this);
    this.init();
  }

  private updateTextColor(): void {
    this.hexValueElement.textContent = `HEX: ${this.colorValue}`;
    this.rgbValueElement.textContent = `RGB: ${hexToRgb(this.colorValue)}`;
    this.hexValueElement.style.color = this.colorValue;
    this.rgbValueElement.style.color = this.colorValue;
  }

  private handleInput(): void {
    this.colorValue = this.colorInputElement.value;
    this.updateTextColor();
  }

  private async handleColorPicker(): Promise<void> {
    if ('EyeDropper' in window) {
      try {
        const eyeDropper = new window.EyeDropper!();
        console.log(eyeDropper);
        const result = await eyeDropper.open();
        console.log(result.sRGBHex);
        const pickedColor = result.sRGBHex;
        if (pickedColor.charAt(0) !== '#') {
          // Workaround for ubuntu chromium
          this.colorValue = rgbaToHex(pickedColor);
        }
        this.colorValue = pickedColor;
        this.updateTextColor();
      } catch (e) {
        console.error('Error with Eyedropper:', e);
      }
    } else {
      alert(
        'The Eyedropper API is not supported by your browser. Your browser may have another option for selecting a color.'
      );
    }
  }

  private handleSaveColor(): void {
    setItemLocalStorage('favoriteColors', this.colorValue);

    // Dispatch a custom event to notify listeners (Sidebar) about the color change
    const event = new CustomEvent('colorSaved', {
      detail: { color: this.colorValue },
    });
    window.dispatchEvent(event);
  }

  private addEventListeners(): void {
    this.colorInputElement.addEventListener('input', this.handleInput);
    this.colorPickerButton.addEventListener('click', this.handleColorPicker);
    this.saveColorButton.addEventListener('click', this.handleSaveColor);

    this.copyColorButton.addEventListener('click', () => {
      copyContent(this.colorValue);
    });
  }

  private init(): void {
    this.updateTextColor();
    this.addEventListeners();
  }
}
