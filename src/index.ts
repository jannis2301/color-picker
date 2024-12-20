import { ColorPicker } from './ColorPicker';
import { MenuButton } from './MenuButton';
import { Sidebar } from './Sidebar';
import { getElementBySelector } from './utils';

const bootstrapper = (): void => {
  const colorPickerElement = getElementBySelector<HTMLElement>('.colorPicker');
  const sidebarElement = getElementBySelector<HTMLElement>('.sidebar');

  new ColorPicker(colorPickerElement);
  new Sidebar(sidebarElement);
  new MenuButton(sidebarElement);
};

window.addEventListener('load', bootstrapper);
