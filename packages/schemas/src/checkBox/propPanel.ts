import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { CheckBoxSchema } from './types';

export const propPanel: PropPanel<CheckBoxSchema> = {
  schema: (propPanelProps: Omit<PropPanelWidgetProps, 'rootElement'>) => {
    if (typeof parentPropPanel.schema !== 'function') {
      throw Error('Oops, is text schema no longer a function?');
    }

    return {
      ...parentPropPanel.schema(propPanelProps),
      label: {
        title: 'Label',
        type: 'string',
        widget: 'Input',
        span: 24,
      },
      checked: {
        title: 'Checked',
        type: 'boolean',
        widget: 'Switch',
        span: 24,
      },
    };
  },
  widgets: {
    ...parentPropPanel.widgets,
  },
  defaultSchema: {
    ...parentPropPanel.defaultSchema,
    readOnly: false,
    type: 'CheckBox',
    label: 'Checkbox',
    checked: false,
    width: 50,
    height: 15,
    text: '',
    variables: [],
    numButtons: 1,
  },
};