import type { Plugin } from '@pdfme/common';
import { pdfRender } from './pdfRender.js';
import { propPanel } from './propPanel.js';
import { uiRender } from './uiRender.js';
import type { RadioButtonSchema } from './types';

const schema: Plugin<RadioButtonSchema> = {
  pdf: pdfRender,
  ui: uiRender,
  propPanel,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n' +
      '  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none" />\n' +
      '  <circle cx="12" cy="12" r="5" fill="currentColor" />\n' +
      '</svg>\n',
  uninterruptedEditMode: true
};
export default schema;