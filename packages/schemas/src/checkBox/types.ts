import type { Schema } from '@pdfme/common';

export interface CheckBoxSchema extends Schema {
  appRender: {
    section: '';
    buttons: [
      {
        id: number;
        label: string;
        checked: boolean;
      },
        {
            id: number;
            label: string;
            checked: boolean;
        },
        {
            id: number;
            label: string;
            checked: boolean;
        }
    ];
  };
}
