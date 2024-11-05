import { UIRenderProps } from '@pdfme/common';
import { RadioButtonGroupSchema } from './types';

export const uiRender = (arg: UIRenderProps<RadioButtonGroupSchema>) => {
  const { value, schema, rootElement, mode, onChange, ...rest } = arg;

  const label = schema.label || 'Radiobuttons';
  rootElement.innerHTML = '';

  const mainContainer = document.createElement('div');
  mainContainer.style.display = 'flex';
  mainContainer.style.alignItems = 'center';
  mainContainer.style.flexWrap = 'nowrap';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.style.marginRight = '10px';
  labelEl.style.display = 'inline-block';
  labelEl.style.whiteSpace = 'nowrap';
  mainContainer.appendChild(labelEl);

  const radioContainer = document.createElement('div');
  radioContainer.style.display = 'flex';
  radioContainer.style.flexWrap = 'nowrap';

  const options = ['i.O.', 'n.i.O.', 'n.V.'];

  options.forEach((option) => {
    const radioItem = document.createElement('div');
    radioItem.style.marginRight = '10px';
    radioItem.style.display = 'inline-flex';
    radioItem.style.alignItems = 'center';
    radioItem.style.whiteSpace = 'nowrap';

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = `radio-group-${schema.id}`;
    radioInput.value = option;
    radioInput.checked = value === option;

    const radioLabel = document.createElement('label');
    radioLabel.textContent = option;
    radioLabel.style.marginLeft = '5px';

    radioInput.addEventListener('change', (e: Event) => {
      if ((e.target as HTMLInputElement).checked) {
        onChange && onChange({ key: 'selectedOption', value: option });
      }
    });

    radioItem.appendChild(radioInput);
    radioItem.appendChild(radioLabel);
    radioContainer.appendChild(radioItem);
  });

  mainContainer.appendChild(radioContainer);
  rootElement.appendChild(mainContainer);
};
