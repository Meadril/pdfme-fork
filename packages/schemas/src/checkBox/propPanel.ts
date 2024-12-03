import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import {CheckBoxSchema} from './types';

export const propPanel: PropPanel<CheckBoxSchema> = {
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
            buttons: {
                title: 'Buttons',
                type: 'array',
                widget: 'ButtonCounter',
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
        type: 'CheckBox',
        position: { x: 10, y: 10 },
        width: 24,
        height: 24,
        appRender: { section: "", buttons: [
                { id: 1, label: "Option 1", checked: false },
                { id: 2, label: "Option 2", checked: false },
                { id: 3, label: "Option 3", checked: false },
            ]
        },
    },
};
