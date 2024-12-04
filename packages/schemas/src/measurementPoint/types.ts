import type { Schema } from '@pdfme/common';

export interface MeasurementPointSchema extends Schema {
  appRender: {
    measurementPoint: string;
    norm: string;
    measurements: [{ id: number; label: string; data: ArrayBuffer[]; }];
  };
}
