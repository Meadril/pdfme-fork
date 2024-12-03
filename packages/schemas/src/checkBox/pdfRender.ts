import { PDFRenderProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';
import { convertForPdfLayoutProps } from '../utils';

const getUncheckedIcon = (color: string, buttons: [], width: number) => {
    let paths = '';
    const spacing = width / buttons.length;

    for (let i = 0; i < buttons.length; i++) {
        paths += `M ${spacing * i + 3},3 h18 v18 h-18 z `;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${width} 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square" style="display: block; margin: auto; max-width: 210mm; max-height: 297mm;"><path d="${paths}" /></svg>`;
};

const getIcon = ({ color, buttons, width }: { color: string, buttons: [], width: number }) => {
    return getUncheckedIcon(color, buttons, width);
};

export const pdfRender = (arg: PDFRenderProps<CheckBoxSchema>) => {
    const { page, schema, } = arg;

    if (!schema.appRender.buttons) return;
    const pageHeight = page.getHeight();
    const { width, position } = convertForPdfLayoutProps({ schema, pageHeight });
    const { x, y } = position;
    const pathData = getIcon({ color: 'black', buttons: schema.appRender.buttons, width });
    page.drawSvgPath(pathData, {
        x,
        y,
        scale: 1,
    });
};
