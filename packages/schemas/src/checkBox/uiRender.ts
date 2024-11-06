import { UIRenderProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';

export const uiRender = (arg: UIRenderProps<CheckBoxSchema>) => {
  const { value, schema, rootElement, mode, onChange, ...rest } = arg;

  const label = schema.label || 'Checkbox';
  rootElement.innerHTML = '';

  const mainContainer = document.createElement('div');
  mainContainer.style.display = 'flex';
  mainContainer.style.alignItems = 'center';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.style.fontFamily = schema.fontName;
    labelEl.style.fontSize = schema.fontSize + 'px';
  labelEl.style.marginRight = '10px';
  mainContainer.appendChild(labelEl);

  const checkBoxInput = document.createElement('input');
  checkBoxInput.type = 'checkbox';

  mainContainer.appendChild(checkBoxInput);
  rootElement.appendChild(mainContainer);
};