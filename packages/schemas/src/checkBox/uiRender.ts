import { UIRenderProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';
import svg from '../graphics/svg';

const getUncheckedIcon = (color: string, buttons: []) => {
    let squares = "";
    const spacing = 24;
    for (let i = 0; i < buttons.length; i++) {
        squares += `<rect width="18" height="18" x="${spacing * i + 3}" y="3" rx="0" stroke-width="1"/>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${spacing * buttons.length} 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square" style="display: block; margin: auto; max-width: 210mm; max-height: 297mm;">${squares}</svg>`;
}

const getIcon = ({ color, buttons }: { value: string; color: string, buttons: [] }) =>
    getUncheckedIcon(color, buttons);

export const uiRender = (arg: UIRenderProps<CheckBoxSchema>) => {
    const { schema, value, rootElement } = arg;
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';

    if (schema.appRender.buttons) {
        void svg.ui({
            ...arg,
            rootElement: container,
            mode: 'viewer',
            value: getIcon({ value, color: 'black', buttons: schema.appRender.buttons }),
        });
    }

    rootElement.appendChild(container);
};