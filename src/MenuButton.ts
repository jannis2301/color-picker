import { getElementBySelector } from './utils';

export class MenuButton {
  private el: HTMLElement;
  private openMenuButton: HTMLButtonElement;
  private closeMenuButton: HTMLButtonElement;

  constructor(el: HTMLElement) {
    this.el = el;
    this.closeMenuButton = getElementBySelector<HTMLButtonElement>(
      '.closeMenuButton',
      this.el
    );
    this.openMenuButton =
      getElementBySelector<HTMLButtonElement>('.openMenuButton');
    this.init();
  }

  private init = () => {
    this.closeMenuButton.addEventListener('click', () => {
      this.el.classList.add('hideSidebar');
    });
    this.openMenuButton.addEventListener('click', () => {
      this.el.classList.remove('hideSidebar');
    });
  };
}
