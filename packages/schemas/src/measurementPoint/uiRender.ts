import { UIRenderProps } from '@pdfme/common';
import { MeasurementPointSchema } from './types';

// eslint-disable-next-line @typescript-eslint/require-await
export const uiRender = async (arg: UIRenderProps<MeasurementPointSchema>): Promise<void> => {
  const { schema, rootElement } = arg;
  rootElement.style.width = '100%';
  rootElement.style.height = '100%';
  const svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n' +
      '  <path d="M5.5 5V19.5H20M7.5 16L11.5 11.5L15.5 14L19.5 8.5" stroke="#121923" stroke-width="1.2"/>\n' +
      '</svg>';

  const firstSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5.5 5V19.5H20" stroke="#121923" stroke-width="1.2"/>
  <path d="M7.5 16L11.5 11.5L15.5 14L19.5 8.5" stroke="#121923" stroke-width="1.2"/>
  <path d="M7.5 6L10.5 10L13.5 8L19.5 14" stroke="#1c8adb" stroke-width="1.2"/>
    </svg>`;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (schema.appRender.measurements && schema.appRender.measurements.length === 1) {
    const chart = document.createElement('div');
    chart.style.width = '100%';
    chart.style.height = '100%';
    chart.innerHTML = svgIcon;
    rootElement.appendChild(chart);
  } else {
    const chartContainer = document.createElement('div');
    chartContainer.style.width = '100%';
    chartContainer.style.height = '100%';
    chartContainer.style.display = 'grid';
    chartContainer.style.gridTemplateColumns = `repeat(auto-fit, minmax(50%, 1fr))`;
    if (schema.appRender.measurements) {
      const measurements = schema.appRender.measurements;
      for (let i = 0; i < measurements.length; i++) {
        const svgToDraw = i === 0 ? firstSvg : svgIcon;
        const chart = document.createElement('div');
        chart.style.width = '100%';
        chart.style.height = '100%';
        chart.innerHTML = svgToDraw;
        chartContainer.appendChild(chart);
      }
    }
    rootElement.appendChild(chartContainer);
  }
};