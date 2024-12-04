import { PDFRenderProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';
import { convertForPdfLayoutProps } from '../utils';

const uncheckedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>`;
const checkedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 12l2 2 4-4"/></svg>`;

export const pdfRender = async (arg: PDFRenderProps<CheckBoxSchema>) => {
    const { page, schema } = arg;
    if (!schema.appRender.buttons) return;

    const pageHeight = page.getHeight();
    const { height, width, position } = convertForPdfLayoutProps({ schema, pageHeight });
    const { x, y } = position;
    const buttons = schema.appRender.buttons;

    // Calculate the spacing between buttons
    const spacing = width / buttons.length;

    for (let i = 0; i < buttons.length; i++) {
        const buttonX = x + (i * spacing); // Position buttons side by side
        const buttonY = y;

        const icon = buttons[i].checked ? checkedIcon : uncheckedIcon;

        await page.drawSvg(icon, {
            x: buttonX,
            y: buttonY + height, // Draw from the top left corner
            width: spacing,
            height: height,
        });
    }
};
