import type { Schema } from '@pdfme/common';

export interface MeasurementPointSchema extends Schema {
    appRender: {section: "", measurements: []};
}
