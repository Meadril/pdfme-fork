import { UIRenderProps } from '@pdfme/common';
import { RadioButtonSchema } from './types';

const uncheckedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`;

export const uiRender = (arg: UIRenderProps<RadioButtonSchema>) => {
    const { schema, rootElement } = arg;

    // Setze das Root-Element dynamisch
    rootElement.style.position = 'relative'; // Für absolute Positionierung innerhalb
    rootElement.style.width = '100%';
    rootElement.style.height = '100%';
    rootElement.style.display = 'flex';
    rootElement.style.flexDirection = 'row'; // Vertikale Anordnung
    rootElement.style.justifyContent = 'center'; // Zentrierung horizontal
    rootElement.style.alignItems = 'center'; // Zentrierung vertikal

    const buttons = schema.appRender.buttons;

    // Dynamische Berechnung von Größe und Abstand
    const containerWidth = rootElement.clientWidth; // Breite des Containers
    const containerHeight = rootElement.clientHeight; // Höhe des Containers
    const spacing = containerWidth / buttons.length; // Horizontaler Abstand

    // Checkbox-Container
    const radioButtonContainer = document.createElement('div');
    radioButtonContainer.style.display = 'flex';
    radioButtonContainer.style.gap = `${Math.min(spacing / 4, 10)}px`; // Optional: kleiner Abstand zwischen den RadioButtons
    radioButtonContainer.style.justifyContent = 'center';
    radioButtonContainer.style.alignItems = 'center';
    radioButtonContainer.style.width = `${containerWidth}px`;
    radioButtonContainer.style.height = `${containerHeight}px`;

    for (let i = 0; i < buttons.length; i++) {
        const radioButton = document.createElement('div');
        radioButton.style.width = `100%`;
        radioButton.style.height = `100%`;
        radioButton.innerHTML = uncheckedIcon;

        radioButtonContainer.appendChild(radioButton);
    }

    rootElement.appendChild(radioButtonContainer);
};
