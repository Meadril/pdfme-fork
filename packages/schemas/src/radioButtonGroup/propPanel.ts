import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { RadioButtonGroupSchema } from './types';

// Definition von mapDynamicVariables (falls benötigt)
const mapDynamicVariables = (props: PropPanelWidgetProps) => {
  const { rootElement, changeSchemas, activeSchema, i18n, options } = props;
  const mvtSchema = activeSchema as any;
  const text = mvtSchema.text || '';
  const variables = JSON.parse(mvtSchema.content) || {};
  const variablesChanged = updateVariablesFromText(text, variables);
  const varNames = Object.keys(variables);

  if (variablesChanged) {
    changeSchemas([
      { key: 'content', value: JSON.stringify(variables), schemaId: activeSchema.id },
      { key: 'variables', value: varNames, schemaId: activeSchema.id }
    ]);
  }

  const placeholderRowEl = document.getElementById('placeholder-dynamic-var')?.closest('.ant-form-item') as HTMLElement;
  if (!placeholderRowEl) {
    throw new Error('Failed to find Ant form placeholder row to create dynamic variables inputs.');
  }
  placeholderRowEl.style.display = 'none';

  (rootElement.parentElement as HTMLElement).style.display = 'block';

  if (varNames.length > 0) {
    for (let variableName of varNames) {
      const varRow = placeholderRowEl.cloneNode(true) as HTMLElement;

      const textarea = varRow.querySelector('textarea') as HTMLTextAreaElement;
      textarea.id = 'dynamic-var-' + variableName;
      textarea.value = variables[variableName];
      textarea.addEventListener('change', (e: Event) => {
        variables[variableName] = (e.target as HTMLTextAreaElement).value;
        changeSchemas([{ key: 'content', value: JSON.stringify(variables), schemaId: activeSchema.id }]);
      });

      const label = varRow.querySelector('label') as HTMLLabelElement;
      label.innerText = variableName;

      varRow.style.display = 'block';
      rootElement.appendChild(varRow);
    }
  } else {
    const para = document.createElement('p');
    para.innerHTML = i18n('schemas.mvt.typingInstructions')
        + ` <code style="color:${options?.theme?.token?.colorPrimary || "#168fe3"}; font-weight:bold;">{`
        + i18n('schemas.mvt.sampleField')
        + '}</code>';
    rootElement.appendChild(para);
  }
};

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

// Helper-Funktion zum Aktualisieren der Variablen
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
