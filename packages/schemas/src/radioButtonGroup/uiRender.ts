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
  labelEl.style.fontFamily = schema.fontName || 'Arial';
  labelEl.style.fontSize = `${schema.fontSize}px`;
  labelEl.style.marginRight = '5px';
  labelEl.style.display = 'inline-block';
  labelEl.style.whiteSpace = 'nowrap';
  mainContainer.appendChild(labelEl);

  const radioContainer = document.createElement('div');
  radioContainer.style.display = 'flex';
  radioContainer.style.flexWrap = 'nowrap';

  const options = ['i.O.', 'n.i.O.', 'n.V.'];

  const radioButtonSize = '10px';

  options.forEach((option, index) => {
    const radioItem = document.createElement('div');
    radioItem.style.marginRight = index < options.length - 1 ? '10px' : '0px';
    radioItem.style.display = 'inline-flex';
    radioItem.style.alignItems = 'center';
    radioItem.style.whiteSpace = 'nowrap';

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = `radio-group-${schema.group}`;
    radioInput.value = option;
    radioInput.checked = value === option;
    radioInput.style.width = radioButtonSize;
    radioInput.style.height = radioButtonSize;
    radioInput.style.margin = '0 5px 0 0';

    const radioLabel = document.createElement('label');
    radioLabel.textContent = option;
    radioLabel.style.fontFamily = schema.fontName || 'Arial';
    radioLabel.style.fontSize = `${schema.fontSize}px`;
    radioLabel.style.marginLeft = '5px';

    radioInput.style.transform = 'translateY(2px)';

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
