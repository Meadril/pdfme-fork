import type { Schema } from '@pdfme/common';

export interface RadioButtonSchema extends Schema {
    appRender: {section: "", buttons: [{id: number, label: string, checked: boolean}, {id: number, label: string, checked: boolean}, {id: number, label: string, checked: boolean}]};
}
