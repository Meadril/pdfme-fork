import { PDFRenderProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';
import { convertForPdfLayoutProps } from '../utils';

const getUncheckedIcon = (color: string, buttons: [], width: number) => {
  let paths = '';
  const spacing = width / buttons.length;

  for (let i = 0; i < buttons.length; i++) {
    paths += `M ${spacing * i + 3},3 h18 v18 h-18 z`;
  }
  return paths;
};

const getIcon = ({ color, buttons, width }: { color: string, buttons: [], width: number }) => {
  return getUncheckedIcon(color, buttons, width);
};

export const pdfRender = (arg: PDFRenderProps<CheckBoxSchema>) => {
  const { page, schema } = arg;
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