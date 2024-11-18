import { PDFRenderProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';
import {PDFFont, rgb} from '@pdfme/pdf-lib';
import { convertForPdfLayoutProps } from '../utils.js';

export const pdfRender = async (arg: PDFRenderProps<CheckBoxSchema>) => {
  const { schema, page, ...rest } = arg;

  const fontSize = schema.fontSize || 12;
  const fontColor = schema.fontColor || '#000000';
  const fontColorRgb = rgb(
      parseInt(fontColor.substring(1, 3), 16) / 255,
      parseInt(fontColor.substring(3, 5), 16) / 255,
      parseInt(fontColor.substring(5, 7), 16) / 255
  );

  const pageHeight = page.getHeight();
  const {
    position: { x, y },
  } = convertForPdfLayoutProps({ schema, pageHeight, applyRotateTranslate: false });

  const checkBoxWidthHeight = 10;
  const labelPadding = 10;

  page.drawText(schema.label, {
    x: x,
    y: y - fontSize / 4,
    size: fontSize,
    color: fontColorRgb,
  });

  const labelWidth = schema.label.length * fontSize * 0.5;
  const currentX = x + labelWidth + labelPadding;

  page.drawRectangle({
    x: currentX,
    y: y - checkBoxWidthHeight + 6,
    width: checkBoxWidthHeight,
    height: checkBoxWidthHeight,
    borderWidth: 1.2,
    color: rgb(1, 1, 1),
    borderColor: rgb(0, 0, 0),
  });

  if (schema.checked) {
    page.drawRectangle({
      x: currentX + 15,
      y: y - checkBoxWidthHeight + 8,
      width: checkBoxWidthHeight - 4,
      height: checkBoxWidthHeight - 4,
      color: rgb(0, 0, 0),
    });
  }
};