import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { MeasurementPointSchema } from './types';

export const propPanel: PropPanel<MeasurementPointSchema> = {
    schema: (propPanelProps: Omit<PropPanelWidgetProps, 'rootElement'>) => {
        if (typeof parentPropPanel.schema !== 'function') {
            throw Error('Oops, is text schema no longer a function?');
        }

        return {
            ...parentPropPanel.schema(propPanelProps),
            appRender: {
                title: 'App Render',
                type: 'object',
                widget: 'Divider',
            },
            section: {
                title: 'Section',
                type: 'string',
                widget: 'Input',
                span: 24,
            },
            measurementPoint: {
                title: 'Measurement Point',
                type: 'string',
                widget: 'Input',
                span: 24,
            },
            measurements: {
                title: 'Measurements',
                type: 'array',
                widget: 'Measurement',
                span: 24,
            },
        }
    },
    widgets: {
        ...parentPropPanel.widgets,
    },
    defaultSchema: {
        ...parentPropPanel.defaultSchema,
        readOnly: false,
        type: 'MeasurementPoint',
        width: 50,
        height: 15,
        appRender: { section: "", measurements: [] },
    },
};
