import { PDFRenderProps } from '@pdfme/common';
import { RadioButtonGroupSchema } from './types';
import { rgb } from '@pdfme/pdf-lib';
import { convertForPdfLayoutProps } from '../utils.js';

export const pdfRender = async (arg: PDFRenderProps<RadioButtonGroupSchema>) => {
  const { schema, page } = arg;

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

  const radioButtonWidthHeight = 10;
  const labelPadding = 5;
  const radioButtonSpacing = 10;

  const options = ['i.O.', 'n.i.O.', 'n.V.'];

  page.drawText(schema.label, {
    x: x,
    y: y - fontSize / 4,
    size: fontSize,
    color: fontColorRgb,
  });

  const labelWidth = schema.label.length * fontSize * 0.7;
  let currentX = x + labelWidth + labelPadding;

  for (let index = 0; index < options.length; index++) {
    const option = options[index];

    page.drawCircle({
      x: currentX + radioButtonWidthHeight / 2,
      y: y - radioButtonWidthHeight / 2 + 6,
      size: radioButtonWidthHeight / 2,
      borderWidth: 1.2,
      color: rgb(1, 1, 1),
      borderColor: rgb(0, 0, 0),
    });

    if (schema.selectedOption === option) {
      page.drawCircle({
        x: currentX + radioButtonWidthHeight / 2,
        y: y - radioButtonWidthHeight / 2 + 4,
        size: radioButtonWidthHeight / 4,
        color: rgb(0, 0, 0),
      });
    }

    const optionWidth = option.length * fontSize * 0.5;
    page.drawText(option, {
      x: currentX + radioButtonWidthHeight + labelPadding,
      y: y - fontSize / 2 + 3,
      size: fontSize,
      color: fontColorRgb,
    });
    currentX += radioButtonWidthHeight + labelPadding + optionWidth + radioButtonSpacing;
  }
};