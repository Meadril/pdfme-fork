import type { Schema } from '@pdfme/common';

export interface RadioButtonSchema extends Schema {
    appRender: {section: "", buttons: []};
}