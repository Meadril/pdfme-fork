import type { Plugin } from '@pdfme/common';
import type { MeasurementPointSchema } from './types';
import {pdfRender} from "./pdfRender";
import {uiRender} from "./uiRender";
import {propPanel} from "./propPanel";

const schema: Plugin<MeasurementPointSchema> = {
    pdf: pdfRender,
    ui: uiRender,
    propPanel,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n' +
        '  <path d="M5.5 5V19.5H20M7.5 16L11.5 11.5L15.5 14L19.5 8.5" stroke="#121923" stroke-width="1.2"/>\n' +
        '</svg>',
    uninterruptedEditMode: true
};
export default schema;
