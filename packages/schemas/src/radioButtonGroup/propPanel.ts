import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { RadioButtonGroupSchema } from './types';

export const propPanel: PropPanel<RadioButtonGroupSchema> = {
  schema: (propPanelProps: Omit<PropPanelWidgetProps, 'rootElement'>) => {
    if (typeof parentPropPanel.schema !== 'function') {
      throw Error('Oops, is text schema no longer a function?');
    }

    return {
      ...parentPropPanel.schema(propPanelProps),
      label: {
        title: 'Group Label',
        type: 'string',
        widget: 'Input',
        span: 24,
      },
      group:{
        title: 'Group',
        type: 'string',
        widget: 'Input',
        span: 24,
      }
    };
  },
  widgets: {
    ...parentPropPanel.widgets,
  },
  defaultSchema: {
    ...parentPropPanel.defaultSchema,
    readOnly: false,
    type: 'RadioButtonGroup',
    group: '',
    label: 'Radiobuttons',
    options: ['i.O.', 'n.i.O.', 'n.V.'],
    width: 50,
    height: 15,
    text: '',
    variables: [],
    numButtons: 3,
  },
};
