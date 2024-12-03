import { UIRenderProps } from '@pdfme/common';
import { MeasurementPointSchema } from './types';


const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5.5 5V19.5H20" stroke="#121923" stroke-width="1.2"/>
  <path d="M7.5 16L11.5 11.5L15.5 14L19.5 8.5" stroke="#121923" stroke-width="1.2"/>
</svg>`;

const firstSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5.5 5V19.5H20" stroke="#121923" stroke-width="1.2"/>
  <path d="M7.5 16L11.5 11.5L15.5 14L19.5 8.5" stroke="#121923" stroke-width="1.2"/>
  <path d="M7.5 6L10.5 10L13.5 8L19.5 14" stroke="#1c8adb" stroke-width="1.2"/>
</svg>`;

export const uiRender = (arg: UIRenderProps<MeasurementPointSchema>) => {
  const { schema, rootElement } = arg;
  rootElement.style.display = 'grid';
  rootElement.style.overflow = 'hidden';
  rootElement.style.gridTemplateColumns = `auto auto auto auto`;

  const measurements = schema.appRender.measurements;

  for (let i = 0; i < measurements.length; i++) {
    const chart = document.createElement('div');
    chart.style.width = '100%';
    chart.style.height = '100%';
    chart.innerHTML = i === 0? firstSvg:svgIcon;
    rootElement.appendChild(chart);
  }
};
