import { UIRenderProps } from '@pdfme/common';
import { MeasureCompSchema } from './types';
import { uiRender as parentUiRender } from '../text/uiRender';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Chart from 'chart.js/auto';

export const uiRender = async (arg: UIRenderProps<MeasureCompSchema>) => {
  const { value, schema, rootElement, mode, onChange, ...rest } = arg;
  const container = document.createElement('div');

  await parentUiRender({
    value: value,
    schema,
    mode: mode == 'form' ? 'viewer' : mode,
    rootElement: container,
    onChange: (arg: { key: string; value: any; } | { key: string; value: any; }[]) => {
      if (!Array.isArray(arg)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onChange && onChange({key: 'text', value: arg.value});
      } else {
        throw new Error('onChange is not an array, the parent text plugin has changed...');
      }
    },
    ...rest,
  });

  const numberOfCharts = schema.numberOfCharts || 1;
  const chartContainer = document.createElement('div');
  chartContainer.style.display = 'flex';
  chartContainer.style.flexDirection = 'column';

  for (let i = 0; i < numberOfCharts; i++) {
    const chartCanvas = document.createElement('canvas');
    chartCanvas.id = `chart-${i}`;
    chartContainer.appendChild(chartCanvas);

    const chart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: ['test', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'],
        datasets: [{
          label: `Chart ${i + 1}`,
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    chartCanvas.addEventListener('renderComplete', () => {
      const svg = chart.toBase64Image('image/svg+xml');
      const img = document.createElement('img');
      img.src = svg;
      chartContainer.appendChild(img);
    });
  }

  container.appendChild(chartContainer);
  rootElement.appendChild(container);
};