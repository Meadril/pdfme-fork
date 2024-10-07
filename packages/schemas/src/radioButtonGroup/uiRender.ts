import { UIRenderProps } from '@pdfme/common';
import { RadioButtonGroupSchema } from './types';

export const uiRender = async (arg: UIRenderProps<RadioButtonGroupSchema>) => {
  const { value, schema, rootElement, mode, onChange, ...rest } = arg;

  let label = schema.label || 'Select an option';
  let options = schema.options ? schema.options.split(',').map(option => option.trim()) : "";
  let numButtons = schema.numButtons || 1;
  let layout = schema.layout || 'vertical'; // Layout-Optionen: 'horizontal' oder 'vertical'

  // Leere das Root-Element
  rootElement.innerHTML = '';

  // Hauptcontainer, der sich an den Inhalt anpasst
  const mainContainer = document.createElement('div');
  mainContainer.style.display = layout === 'horizontal' ? 'flex' : 'block'; // Flexbox für horizontales Layout
  mainContainer.style.alignItems = layout === 'horizontal' ? 'center' : 'unset'; // Zentrieren der Inhalte bei horizontalem Layout
  mainContainer.style.flexWrap = 'nowrap'; // Kein Umbruch der Inhalte

  // Label-Element erzeugen
  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.style.marginRight = layout === 'horizontal' ? '10px' : '0'; // Abstand nur bei horizontalem Layout
  labelEl.style.display = 'inline-block'; // Label bleibt auf einer Linie
  labelEl.style.whiteSpace = 'nowrap'; // Verhindert Zeilenumbruch im Label
  mainContainer.appendChild(labelEl);

  // Container für die Radio Buttons erstellen
  const radioContainer = document.createElement('div');
  radioContainer.style.display = layout === 'horizontal' ? 'flex' : 'block'; // Flexbox für horizontales Layout, Block für vertikal
  radioContainer.style.flexWrap = 'nowrap'; // Verhindert Umbruch bei den Radio Buttons

  for (let i = 0; i < numButtons; i++) {
    const option = options[i] || `Option ${i + 1}`;

    const radioItem = document.createElement('div');
    radioItem.style.marginRight = layout === 'horizontal' ? '10px' : '0'; // Abstand zwischen Buttons nur bei horizontalem Layout
    radioItem.style.display = 'inline-flex'; // Radio-Button und Label in einer Zeile
    radioItem.style.alignItems = 'center'; // Zentriert die Radio-Buttons vertikal mit dem Label
    radioItem.style.whiteSpace = 'nowrap'; // Verhindert Umbruch innerhalb des Radio-Items

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = `radio-group-${schema.id}`;
    radioInput.value = option;
    radioInput.checked = value === option;

    const radioLabel = document.createElement('label');
    radioLabel.textContent = option;
    radioLabel.style.marginLeft = '5px'; // Abstand zwischen Radio Button und Text

    radioInput.addEventListener('change', (e: Event) => {
      if ((e.target as HTMLInputElement).checked) {
        onChange && onChange({ key: 'selectedOption', value: option });
      }
    });

    // Radio Button und Label auf einer Linie
    radioItem.appendChild(radioInput);
    radioItem.appendChild(radioLabel);
    radioContainer.appendChild(radioItem);
  }

  mainContainer.appendChild(radioContainer);
  rootElement.appendChild(mainContainer);

};

