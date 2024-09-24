import type { PropPanel } from '@pdfme/common';
import type { TableSchema } from './types';
import { getFallbackFontName, DEFAULT_FONT_NAME } from '@pdfme/common';
import {
  getDefaultCellStyles,
  getCellPropPanelSchema,
  getColumnStylesPropPanelSchema,
} from './helper.js';
import { HEX_COLOR_PATTERN } from '../constants.js';

export const propPanel: PropPanel<TableSchema> = {
  schema: ({ activeSchema, options, i18n }) => {
    // @ts-ignore
    const head = (activeSchema.head || []) as string[];
    const font = options.font || { [DEFAULT_FONT_NAME]: { data: '', fallback: true } };
    const fontNames = Object.keys(font);
    const fallbackFontName = getFallbackFontName(font);
    return {
      tableStyles: {
        title: i18n('schemas.table.tableStyle'),
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: {
          borderWidth: {
            title: i18n('schemas.borderWidth'),
            type: 'number',
            widget: 'inputNumber',
            props: { min: 0, step: 0.1 },
            step: 1,
          },
          borderColor: {
            title: i18n('schemas.borderColor'),
            type: 'string',
            widget: 'color',
            rules: [{ pattern: HEX_COLOR_PATTERN, message: i18n('validation.hexColor') }],
          },
        },
      },
      headStyles: {
        title: i18n('schemas.table.headStyle'),
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: getCellPropPanelSchema({ i18n, fallbackFontName, fontNames }),
      },
      bodyStyles: {
        title: i18n('schemas.table.bodyStyle'),
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: getCellPropPanelSchema({ i18n, fallbackFontName, fontNames, isBody: true }),
      },
      columnStyles: {
        title: i18n('schemas.table.columnStyle'),
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: getColumnStylesPropPanelSchema({ head, i18n }),
      },
    };
  },
  defaultSchema: {
    name: '',
    type: 'table',
    position: { x: 0, y: 0 },
    width: 150,
    height: 20,
    content: JSON.stringify([
      ['KMG', '002131982', 'Display kaputt'],
      ['CBSF', '00213134', 'Gehäuse gebrochen'],
    ]),
    showHead: true,
    head: ['Produkt', 'Seriennummer', 'Fehler'],
    headWidthPercentages: [30, 30, 40],
    tableStyles: {
      borderColor: '#000000',
      borderWidth: 0.3,
    },
    headStyles: Object.assign(getDefaultCellStyles(), {
      fontColor: '#ffffff',
      backgroundColor: '#2980ba',
      borderColor: '',
      borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
    }),
    bodyStyles: Object.assign(getDefaultCellStyles(), {
      alternateBackgroundColor: '#f5f5f5',
    }),
    columnStyles: {},
  },
};
