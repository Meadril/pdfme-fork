import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { MeasureCompSchema } from './types';

export const propPanel: PropPanel<MeasureCompSchema> = {
  schema: (propPanelProps: Omit<PropPanelWidgetProps, 'rootElement'>) => {
    if (typeof parentPropPanel.schema !== 'function') {
      throw Error('Oops, is text schema no longer a function?');
    }
    return {
      ...parentPropPanel.schema(propPanelProps),
      numberOfCharts: {
        title: 'Number of Charts',
        type: 'number',
        default: 1,
      },
    };
  },
  widgets: { ...parentPropPanel.widgets },
  defaultSchema: {
    ...parentPropPanel.defaultSchema,
    numberOfCharts: 1,
    text: "",
    variables: [],
    data: [],
  },
};