import { UIRenderProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';

const uncheckedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>`;

export const uiRender = (arg: UIRenderProps<CheckBoxSchema>) => {
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
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.display = 'flex';
    checkboxContainer.style.gap = `${Math.min(spacing / 4, 10)}px`; // Optional: kleiner Abstand zwischen den Checkboxen
    checkboxContainer.style.justifyContent = 'center';
    checkboxContainer.style.alignItems = 'center';
    checkboxContainer.style.width = `${containerWidth}px`;
    checkboxContainer.style.height = `${containerHeight}px`;

    for (let i = 0; i < buttons.length; i++) {
        const checkbox = document.createElement('div');
        checkbox.style.width = `100%`;
        checkbox.style.height = `100%`;
        checkbox.innerHTML = uncheckedIcon;

        checkboxContainer.appendChild(checkbox);
    }

    rootElement.appendChild(checkboxContainer);
};
