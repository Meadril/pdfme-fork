import { UIRenderProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';

const uncheckedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>`;

export const uiRender = (arg: UIRenderProps<CheckBoxSchema>) => {
    const { schema, rootElement } = arg;
    rootElement.style.display = 'grid';
    rootElement.style.overflow = 'hidden';
    rootElement.style.gridTemplateColumns = `repeat(auto-fit)`;

    const buttons = schema.appRender.buttons;

    for (let i = 0; i < buttons.length; i++) {
        const checkbox = document.createElement('div');
        checkbox.style.width = '100%';
        checkbox.style.height = '100%';
        checkbox.innerHTML = uncheckedIcon;
        rootElement.appendChild(checkbox);
    }
};
