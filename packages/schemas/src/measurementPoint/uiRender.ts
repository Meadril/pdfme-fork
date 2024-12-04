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

  // Set the root element styles
  rootElement.style.position = 'relative';
  rootElement.style.width = '100%';
  rootElement.style.height = '100%';
  rootElement.style.display = 'flex';
  rootElement.style.flexWrap = 'wrap'; // Enable wrapping
  rootElement.style.justifyContent = 'flex-start'; // Align items to the left
  rootElement.style.alignItems = 'flex-start'; // Align items to the top

  const measurements = schema.appRender.measurements;

  // Dynamically calculate the size and spacing
  const numRows = Math.ceil(measurements.length / 2);
  const containerHeight = rootElement.clientHeight; // Height of the container
  const rowHeight = containerHeight / numRows;

  for (let i = 0; i < measurements.length; i++) {
    const chart = document.createElement('div');
    if (measurements.length === 1 || (i % 2 === 0 && i === measurements.length - 1)) {
      chart.style.flex = '1 1 100%'; // Use the entire width if only one chart is present
    } else {
      chart.style.flex = `1 1 calc(50% - 10px)`; // Each chart takes up 50% of the width minus the gap
    }
    chart.style.height = `${rowHeight}px`; // Set the height based on the number of rows
    chart.style.alignSelf = "flex-start"; // Align the first element of each row to the left
    chart.innerHTML = i === 0 ? firstSvg : svgIcon;

    rootElement.appendChild(chart);
  }
};
