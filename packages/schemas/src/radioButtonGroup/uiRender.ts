import { UIRenderProps } from '@pdfme/common';
import { RadioButtonGroupSchema } from './types';

export const uiRender = async (arg: UIRenderProps<RadioButtonGroupSchema>) => {
  const { value, schema, rootElement, mode, onChange, ...rest } = arg;

  // Text wird für das Label genutzt
  let label = schema.label || 'Select an option';
  let options = schema.options ? schema.options.split(',').map(option => option.trim()) : [];
  let numButtons = schema.numButtons || 1;

  // Root element leeren
  rootElement.innerHTML = '';

  // Label hinzufügen
  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  rootElement.appendChild(labelEl);

  // Radio-Buttons erstellen
  for (let i = 0; i < numButtons; i++) {
    const option = options[i] || `Option ${i + 1}`;

    // Radio-Button erstellen
    const radioContainer = document.createElement('div');
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = `radio-group-${schema.id}`;
    radioInput.value = option;
    radioInput.checked = value === option;

    // Label für den Radio-Button
    const radioLabel = document.createElement('label');
    radioLabel.textContent = option;

    radioInput.addEventListener('change', (e: Event) => {
      if ((e.target as HTMLInputElement).checked) {
        onChange && onChange({ key: 'selectedOption', value: option });
      }
    });

    // Radio-Button und Label ins DOM einfügen
    radioContainer.appendChild(radioInput);
    radioContainer.appendChild(radioLabel);
    rootElement.appendChild(radioContainer);
  }
};
