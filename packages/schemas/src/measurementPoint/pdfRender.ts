import { PDFRenderProps } from '@pdfme/common';
import { MeasurementPointSchema } from './types';
import { convertForPdfLayoutProps } from '../utils';
import {Buffer} from 'buffer';

const icon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n' +
    '  <path d="M5.5 5V19.5H20M7.5 16L11.5 11.5L15.5 14L19.5 8.5" stroke="#121923" stroke-width="1.2"/>\n' +
    '</svg>';

export const pdfRender = async (arg: PDFRenderProps<MeasurementPointSchema>) => {
  const { page, schema, pdfDoc } = arg;

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

  // Example base64-encoded PNG image (sample byte array)
  const samplePngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAAC0lEQVR42mNk+AMAAD8BAM25eUUAAAAASUVORK5CYII='; // Truncated for brevity

  for (let i = 0; i < measurements.length; i++) {
    const isLeft = i % 2 === 0;
    const currentRow = Math.floor(i / 2);
    const imgWidth = width / 2;
    const imgHeight = rowHeight;
    const posX = x + (isLeft ? 0 : imgWidth);
    const posY = y + totalHeight - (currentRow + 1) * rowHeight + rowHeight;

    // Use the sample byte array for the PNG image
    const pngImage = await pdfDoc.embedPng(Buffer.from(samplePngBase64, 'base64'));
    const pngDims = pngImage.scale(1);

    page.drawImage(pngImage, {
      x: posX,
      y: posY + totalHeight, // Draw from the top left corner
      width: imgWidth,
      height: imgHeight,
    });
  }
};
