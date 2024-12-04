import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { MeasurementPointSchema } from './types';

export const propPanel: PropPanel<MeasurementPointSchema> = {
    schema: (propPanelProps: Omit<PropPanelWidgetProps, 'rootElement'>) => {
        return {
            section: {
                title: 'Section',
                type: 'string',
                widget: 'Input',
                span: 24,
            },
            appRender: {
                type: 'object',
                properties: {
                    measurementPoint: {
                        title: 'Measurement Point',
                        type: 'string',
                        widget: 'Input',
                        span: 24,
                        required: true,
                    },
                    norm: {
                        title: 'Norm',
                        type: 'string',
                        widget: 'select',
                        props: {
                            options: [
                                { label: "EN 12453:2017", value: "EN 12453:2017" },
                                { label: "EN 16005:2012", value: "EN 16005:2012" },
                                { label: "EN 1414120:2015", value: "EN 1414120:2015" },
                            ],
                        },
                        required: true,
                    },
                    measurements: {
                        title: 'Measurements',
                        type: 'array',
                        widget: 'Measurement',
                        span: 24,
                        required: true,
                    }
                }
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
        width: 24,
        height: 24,
        appRender: { measurementPoint: "", norm: "", measurements: [{id: 1, label: 'Overview', data: '' }]},
    },
};
