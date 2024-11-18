import { PDFRenderProps } from '@pdfme/common';
import { MeasureCompSchema } from './types';
import { pdfRender as parentPdfRender } from '../text/pdfRender';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export const pdfRender = async (arg: PDFRenderProps<MeasureCompSchema>) => {
  const { value, schema, pdfDoc, page, ...rest } = arg;

  const numberOfCharts = schema.numberOfCharts || 1;
  const chartHeight = 200;
  const chartWidth = page.getWidth() - 40;

  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: chartWidth, height: chartHeight });

  for (let i = 0; i < numberOfCharts; i++) {
    const chartDataUrl = await chartJSNodeCanvas.renderToDataURL({
      type: 'line',
      data: {
        labels: ['test', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'],
        datasets: [{
          label: `Chart ${i + 1}`,
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });

    const chartImage = await pdfDoc.embedPng(chartDataUrl);
    const yPosition = page.getHeight() - (i + 1) * (chartHeight + 10) - 20;

    page.drawImage(chartImage, {
      x: 20,
      y: yPosition,
      width: chartWidth,
      height: chartHeight
    });
  }

  await parentPdfRender({ value, schema, pdfDoc, page, ...rest });
};