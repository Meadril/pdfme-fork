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
        bind: true,
      },
      numButtons: {
        title: 'Number of Radio Buttons',
        type: 'number',
        widget: 'InputNumber',
        props: {
          min: 1,
          max: 6,
        },
        span: 24,
        bind: true,
        onChange: (value: number, changeSchemas: Function, schemaId: string) => {
          changeSchemas([{ key: 'numButtons', value, schemaId }]);
        },
      },
      options: {
        title: 'Radio Button Labels (comma-separated)',
        type: 'string',
        widget: 'Input',
        span: 24,
        bind: true,
        props: {
          placeholder: 'Option 1, Option 2, Option 3',
        },
        onChange: (value: string, changeSchemas: Function, schemaId: string) => {
          const newOptions = value.split(',').map(option => option.trim()).filter(option => option.length > 0);
          changeSchemas([{ key: 'options', value: newOptions, schemaId }]);
        },
      },
    };
  },
  widgets: {
    ...parentPropPanel.widgets,
  },
  defaultSchema: {
    ...parentPropPanel.defaultSchema,
    readOnly: false,
    type: 'RadioButtonGroup',
    label: 'Select an option',
    numButtons: 3,
    options: "Option 1, Option 2, Option 3",
    width: 50,
    height: 15,
  },
};

const updateVariablesFromText = (text: string, variables: any): boolean => {
  const regex = /\{([^{}]+)}/g;
  const matches = text.match(regex);
  let changed = false;

  if (matches) {
    for (const match of matches) {
      const variableName = match.replace('{', '').replace('}', '');
      if (!(variableName in variables)) {
        variables[variableName] = variableName.toUpperCase();
        changed = true;
      }
    }

    Object.keys(variables).forEach((variableName) => {
      if (!matches.includes('{' + variableName + '}')) {
        delete variables[variableName];
        changed = true;
      }
    });
  } else {
    Object.keys(variables).forEach((variableName) => {
      delete variables[variableName];
      changed = true;
    });
  }

  return changed;
};
