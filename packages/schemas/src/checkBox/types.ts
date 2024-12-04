import type { Schema } from '@pdfme/common';

export interface CheckBoxSchema extends Schema {
  appRender: {
    title: string,
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
