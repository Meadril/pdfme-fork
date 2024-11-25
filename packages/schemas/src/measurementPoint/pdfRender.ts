import { PDFRenderProps } from '@pdfme/common';
import { MeasurementPointSchema } from './types';
import { convertForPdfLayoutProps } from '../utils';

const icon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n' +
  '  <path d="M5.5 5V19.5H20M7.5 16L11.5 11.5L15.5 14L19.5 8.5" stroke="#121923" stroke-width="1.2"/>\n' +
  '</svg>';

export const pdfRender = async (arg: PDFRenderProps<MeasurementPointSchema>) => {
  const { page, schema } = arg;

  if (!schema.appRender.measurements) return;

  const pageHeight = page.getHeight();
  const {
    width,
    height: totalHeight,
    position: { x, y },
  } = convertForPdfLayoutProps({
    schema,
    pageHeight,
  });
  const measurements = schema.appRender.measurements;
  const numRows = Math.ceil(measurements.length / 2);
  const rowHeight = totalHeight / numRows;

  const firstSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5.5 5V19.5H20" stroke="#121923" stroke-width="1.2"/>
  <path d="M7.5 16L11.5 11.5L15.5 14L19.5 8.5" stroke="#121923" stroke-width="1.2"/>
  <path d="M7.5 6L10.5 10L13.5 8L19.5 14" stroke="#1c8adb" stroke-width="1.2"/>
</svg>`;

  for (let i = 0; i < measurements.length; i++) {
    const isLeft = i % 2 === 0;
    const currentRow = Math.floor(i / 2);
    const imgWidth = width / 2;
    const imgHeight = rowHeight;
    const posX = x + (isLeft ? 0 : imgWidth);
    const posY = y + totalHeight - (currentRow + 1) * rowHeight + rowHeight;

    const svgToDraw = i === 0 ? firstSvg : icon;

    console.log('posX', posX, 'posY', posY, 'imgWidth', imgWidth, 'imgHeight', imgHeight);
    await page.drawSvg(svgToDraw, {
      x: posX,
      y: posY,
      width: imgWidth,
      height: imgHeight,
    });
  }
};
