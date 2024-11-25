import { propPanel as parentPropPanel } from '../text/propPanel';
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { MultiVariableTextSchema } from './types';
import {i18n} from "@pdfme/ui/src/i18n";

const availableVariables = [
  { "Variable": "KundennummerB", "AngezeigterName": "BetreiberKundennummer" },
  { "Variable": "NameB", "AngezeigterName": "BetreiberName" },
  { "Variable": "PLZB", "AngezeigterName": "BetreiberPLZ" },
  { "Variable": "AnsprechpartnerB", "AngezeigterName": "BetreiberAnsprechpartner" },
  { "Variable": "OrtB", "AngezeigterName": "BetreiberOrt" },
  { "Variable": "TelefonnummerB", "AngezeigterName": "BetreiberTelefonnummer" },
  { "Variable": "EmailB", "AngezeigterName": "BetreiberEMail" },
  { "Variable": "StrasseB", "AngezeigterName": "BetreiberStrasse" },
  { "Variable": "HausnrB", "AngezeigterName": "BetreiberHausnr" },
  { "Variable": "NameF", "AngezeigterName": "FirmaName" },
  { "Variable": "EmailF", "AngezeigterName": "FirmaEMail" },
  { "Variable": "TelefonF", "AngezeigterName": "FirmaTelefon" },
  { "Variable": "StrasseF", "AngezeigterName": "FirmaStrasse" },
  { "Variable": "PLZF", "AngezeigterName": "FirmaPLZ" },
  { "Variable": "OrtF", "AngezeigterName": "FirmaOrt" },
  { "Variable": "AnsprechpartnerF", "AngezeigterName": "FirmaAnsprechpartner" },
  { "Variable": "HausnrF", "AngezeigterName": "FirmaHausnr" },
  { "Variable": "Pruefgrundlage", "AngezeigterName": "PruefungGrundlage" },
  { "Variable": "Vetragsnummer", "AngezeigterName": "PruefungVertragsnummer" },
  { "Variable": "PrueferID", "AngezeigterName": "PruefungPruefer" },
  { "Variable": "PruefDatum", "AngezeigterName": "PruefungPruefDatum" },
  { "Variable": "naeschtePruefung", "AngezeigterName": "PruefungNaechstePruef" },
  { "Variable": "pruefungsState", "AngezeigterName": "PruefungState" },
  { "Variable": "updatedAt", "AngezeigterName": "PruefungUpdatedAt" },
  { "Variable": "HerstellerP", "AngezeigterName": "ObjektHersteller" },
  { "Variable": "StandortP", "AngezeigterName": "ObjektStandort" },
  { "Variable": "TypP", "AngezeigterName": "ObjektTyp" },
  { "Variable": "SeriennummerP", "AngezeigterName": "ObjektSeriennummer" },
  { "Variable": "InterneTorNummerP", "AngezeigterName": "ObjektInterneNummer" },
  { "Variable": "BaujahrP", "AngezeigterName": "ObjektBaujahr" },
  { "Variable": "Steuerung", "AngezeigterName": "ObjektSteuerung" },
  { "Variable": "BetriebsartP", "AngezeigterName": "ObjektBetriebsart" },
  { "Variable": "BreiteP", "AngezeigterName": "ObjektBreite" },
  { "Variable": "HoeheP", "AngezeigterName": "ObjektHoehe" },
  { "Variable": "BemerkungP", "AngezeigterName": "ObjektBemerkung" },
  { "Variable": "Vorname", "AngezeigterName": "PrueferVorname" },
  { "Variable": "Nachname", "AngezeigterName": "PrueferNachname" },
  { "Variable": "email", "AngezeigterName": "PrueferEMail" },
  { "Variable": "subID", "AngezeigterName": "PrueferID" }
];

const mapDynamicVariables = (props: PropPanelWidgetProps) => {
  const { rootElement, changeSchemas, activeSchema, i18n, options } = props;

  const mvtSchema = (activeSchema as any);
  const text = mvtSchema.text || '';
  const variables = JSON.parse(mvtSchema.content) || {};
  const variablesChanged = updateVariablesFromText(text, variables);
  const varNames = Object.keys(variables);

  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.padding = '20px';
  modal.style.backgroundColor = 'white';
  modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  modal.style.zIndex = '1000';
  modal.style.display = 'none';

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '999';
  overlay.style.display = 'none';

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Schließen';
  closeButton.onclick = () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  };

  const variableList = document.createElement('ul');
  availableVariables.forEach(variable => {
    const listItem = document.createElement('li');
    listItem.innerText = `${variable.AngezeigterName}`;
    variableList.appendChild(listItem);
  });

  modal.appendChild(document.createElement('h2')).innerText = 'Verfügbare Variablen';
  modal.appendChild(variableList);
  modal.appendChild(closeButton);

  const openModal = () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
  };

  const openButton = document.createElement('button');
  openButton.innerText = 'Verfügbare Variablen anzeigen';
  openButton.onclick = openModal;
  rootElement.appendChild(openButton);

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

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

      const label = varRow.querySelector('label') as HTMLLabelElement
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

export const propPanel: PropPanel<MultiVariableTextSchema> = {
  schema: (propPanelProps: Omit<PropPanelWidgetProps, 'rootElement'>) => {
    if (typeof parentPropPanel.schema !== 'function') {
      throw Error('Oops, is text schema no longer a function?');
    }
    return {
      ...parentPropPanel.schema(propPanelProps),
      groupContainer:{
        title: "Group Container",
        type: 'string',
      },
      '-------': { type: 'void', widget: 'Divider' },
      dynamicVarContainer: {
        title: i18n('schemas.mvt.variablesSampleData'),
        type: 'string',
        widget: 'Card',
        span: 24,
        properties: {
          dynamicVariables: {
            type: 'object',
            widget: 'mapDynamicVariables',
            bind: false,
            span: 24
          },
          placeholderDynamicVar: {
            title: 'Placeholder Dynamic Variable',
            type: 'string',
            format: 'textarea',
            props: {
              id: 'placeholder-dynamic-var',
              autoSize: {
                minRows: 2,
                maxRows: 5,
              },
            },
            span: 24,
          },
        }
      },
    };
  },
  widgets: { ...parentPropPanel.widgets, mapDynamicVariables },
  defaultSchema: {
    ...parentPropPanel.defaultSchema,
    readOnly: false,
    type: 'multiVariableText',
    text: 'Add text here using {} for variables ',
    width: 50,
    height: 15,
    content: '{}',
    variables: [],
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
}
