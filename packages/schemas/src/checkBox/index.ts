import type { Plugin } from '@pdfme/common';
import { pdfRender } from './pdfRender.js';
import { propPanel } from './propPanel.js';
import { uiRender } from './uiRender.js';
import type { CheckBoxSchema } from './types';

const schema: Plugin<CheckBoxSchema> = {
  pdf: pdfRender,
  ui: uiRender,
  propPanel,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n' +
      '  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none" />\n' +
      '  <polyline points="9 11 12 14 22 4" stroke="currentColor" stroke-width="2" fill="none" />\n' +
      '</svg>\n',
  uninterruptedEditMode: true
};
export default schema;