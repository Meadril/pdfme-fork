import { PDFRenderProps } from '@pdfme/common';
import { RadioButtonSchema } from './types';
import { convertForPdfLayoutProps } from '../utils';

const getUncheckedIcon = (color: string, buttons: [], width: number, height: number) => {
  let paths = "";
  const spacing = width / buttons.length;
  for (let i = 0; i < buttons.length; i++) {
    const cx = spacing * i + spacing / 2;
    const cy = height / 2;
    const r = Math.min(spacing, height) / 2 - 3;
    paths += `M ${cx - r},${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0 `;
  }
  return paths;
};

const getIcon = ({ color, buttons, width, height }: { color: string, buttons: [], width: number, height: number }): string => {
  if (!buttons) return '';
  return getUncheckedIcon(color, buttons, width, height);
};

export const pdfRender = (arg: PDFRenderProps<RadioButtonSchema>) => {
  const { page, schema } = arg;
  if (!schema.appRender.buttons) return;
  const pageHeight = page.getHeight();
  const { width, height, position } = convertForPdfLayoutProps({ schema, pageHeight });
  const { x, y } = position;
  const pathData = getIcon({ color: 'black', buttons: schema.appRender.buttons, width, height });
  page.drawSvgPath(pathData, {
    x,
    y,
    scale: 1,
    borderWidth: 2,
  });
};