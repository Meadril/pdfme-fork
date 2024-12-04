import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { RadioButtonSchema } from './types';

export const propPanel: PropPanel<RadioButtonSchema> = {
    schema: (propPanelProps: Omit<PropPanelWidgetProps, 'rootElement'>) => {
        return {
            section: {
                title: 'Section',
                type: 'string',
                widget: 'Input',
                span: 24,
                required: true,
            },
            appRender: {
                type: 'object',
                properties: {
                    title: {
                        title: 'Title',
                        type: 'string',
                        widget: 'Input',
                        span: 24,
                        required: true,
                    },
                    buttons: {
                        title: 'Buttons',
                        type: 'array',
                        widget: 'ButtonCounter',
                        span: 24,
                        required: true,
                    },
                }
            }
        }
    },
    widgets: {
        ...parentPropPanel.widgets,
    },
    defaultSchema: {
        ...parentPropPanel.defaultSchema,
        readOnly: false,
        type: 'RadioButton',
        position: { x: 10, y: 10 },
        width: 24,
        height: 24,
        section: "",
        appRender: { title: "RadioGroup Title", buttons: [
            { id: 1, label: "Option 1", checked: false },
            { id: 2, label: "Option 2", checked: false },
            { id: 3, label: "Option 3", checked: false },
            ]
        },
    },
};
