import {
  Template,
  Font,
  getInputFromTemplate,
  getDefaultFont,
  DEFAULT_FONT_NAME,
} from '@pdfme/common';
import { Designer } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import {
  multiVariableText,
  text,
  barcodes,
  image,
  svg,
  line,
  table,
  rectangle,
  ellipse,
  radioButton,
  checkBox,
  measurementPoint,
} from '@pdfme/schemas';
import plugins from './plugins/index';

const fontObjList = [
  {
    fallback: true,
    label: 'NotoSerifJP-Regular',
    url: '/fonts/NotoSerifJP-Regular.otf',
  },
  {
    fallback: false,
    label: 'NotoSansJP-Regular',
    url: '/fonts/NotoSansJP-Regular.otf',
  },
  {
    fallback: false,
    label: DEFAULT_FONT_NAME,
    data: getDefaultFont()[DEFAULT_FONT_NAME].data,
  },
];

export const getFontsData = async () => {
  const fontDataList = (await Promise.all(
      fontObjList.map(async (font) => ({
        ...font,
        data: font.data || (await fetch(font.url || '').then((res) => res.arrayBuffer())),
      }))
  )) as { fallback: boolean; label: string; data: ArrayBuffer }[];

  return fontDataList.reduce((acc, font) => ({ ...acc, [font.label]: font }), {} as Font);
};

export const getPlugins = () => {
  return {
    Text: text,
    'Multi-Variable Text': multiVariableText,
    Table: table,
    Line: line,
    Rectangle: rectangle,
    Ellipse: ellipse,
    Image: image,
    SVG: svg,
    Signature: plugins.signature,
    QR: barcodes.qrcode,
    RadioButton: radioButton,
    CheckBox: checkBox,
    MeasurementPoint: measurementPoint,
  };
};

export const generatePDF = async (currentRef: Designer ) => {
  if (!currentRef) return;
  const template = currentRef.getTemplate();
  const inputs = getInputFromTemplate(template);
  const font = await getFontsData();

  try {
    const pdf = await generate({
      template,
      inputs,
      options: {
        font,
        title: 'pdfme',
      },
      plugins: getPlugins(),
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  } catch (e) {
    alert(e + '\n\nCheck the console for full stack trace');
    throw e;
  }
};

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const getBlankTemplate = () =>
    ({
      schemas: [{}],
      basePdf: {
        width: 210,
        height: 297,
        padding: [10, 10, 10, 10],
      },
    } as Template);

export const getTemplatePresets = (): {
  key: string;
  label: string;
  template: () => Template;
}[] => [
  { key: 'blank', label: 'Blank', template: getBlankTemplate },
  { key: 'custom', label: 'Custom', template: getBlankTemplate },
];

export const getTemplateByPreset = (templatePreset: string): Template => {
  const templatePresets = getTemplatePresets();
  const preset = templatePresets.find((preset) => preset.key === templatePreset);
  return preset ? preset.template() : templatePresets[0].template();
};