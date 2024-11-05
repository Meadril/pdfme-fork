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
  labelEl.style.marginRight = '10px';
  mainContainer.appendChild(labelEl);

  const checkBoxInput = document.createElement('input');
  checkBoxInput.type = 'checkbox';
  checkBoxInput.checked = value === 'checked';

  checkBoxInput.addEventListener('change', (e: Event) => {
    onChange && onChange({ key: 'checked', value: (e.target as HTMLInputElement).checked ? 'checked' : 'unchecked' });
  });

  mainContainer.appendChild(checkBoxInput);
  rootElement.appendChild(mainContainer);
};