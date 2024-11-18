import {
  PDFRenderProps,
  mm2pt,
  getDefaultFont,
  getFallbackFontName,
  Font,
  ColorType,
} from '@pdfme/common';
import { hex2PrintingColor, rotatePoint, convertForPdfLayoutProps } from '../utils';
import { PDFDocument, PDFFont, degrees } from '@pdfme/pdf-lib';
import {
  DEFAULT_ALIGNMENT,
  DEFAULT_CHARACTER_SPACING,
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_VERTICAL_ALIGNMENT,
} from '../text/constants';
import { TextSchema } from '../text/types';
import {calculateDynamicFontSize, getFontDescentInPt, heightOfFontAtSize, splitTextToSize} from '../text/helper';

const embedAndGetFontObj = async (arg: {
  pdfDoc: PDFDocument;
  font: Font;
  _cache: Map<any, any>;
}) => {
  const { pdfDoc, font, _cache } = arg;
  if (_cache.has(pdfDoc)) {
    return _cache.get(pdfDoc) as { [key: string]: PDFFont };
  }

  const fontValues = await Promise.all(
      Object.values(font).map(async (v) => {
        let fontData = v.data;
        if (typeof fontData === 'string' && fontData.startsWith('http')) {
          fontData = await fetch(fontData).then((res) => res.arrayBuffer());
        }
        return pdfDoc.embedFont(fontData, {
          subset: typeof v.subset === 'undefined' ? true : v.subset,
        });
      })
  );

  const fontObj = Object.keys(font).reduce(
      (acc, cur, i) => Object.assign(acc, { [cur]: fontValues[i] }),
      {} as { [key: string]: PDFFont }
  );

  _cache.set(pdfDoc, fontObj);
  return fontObj;
};

export const getFontKitFont = async (fontName: string, font: string, _cache: any): Promise<any> => {
  return _cache[fontName] || font;
};

const getFontProp = async ({
                             value,
                             font,
                             schema,
                             colorType,
                             _cache,
                           }: {
  value: string;
  font: Font;
  colorType?: ColorType;
  schema: TextSchema;
  _cache: Map<any, any>;
}) => {
  const fontSize = schema.dynamicFontSize
      ? await calculateDynamicFontSize({ textSchema: schema, font, value, _cache })
      : schema.fontSize ?? DEFAULT_FONT_SIZE;
  const color = hex2PrintingColor(schema.fontColor || DEFAULT_FONT_COLOR, colorType);

  return {
    alignment: schema.alignment ?? DEFAULT_ALIGNMENT,
    verticalAlignment: schema.verticalAlignment ?? DEFAULT_VERTICAL_ALIGNMENT,
    lineHeight: schema.lineHeight ?? DEFAULT_LINE_HEIGHT,
    characterSpacing: schema.characterSpacing ?? DEFAULT_CHARACTER_SPACING,
    fontSize,
    color,
  };
};

export const pdfRender = async (arg: PDFRenderProps<TextSchema>) => {
  const { value, pdfDoc, pdfLib, page, options, schema, _cache } = arg;
  if (!value) {
    console.error('Value is missing or empty');
    return;
  }

  const { font = getDefaultFont(), colorType } = options;

  const [pdfFontObj, fontKitFont, fontProp] = await Promise.all([
    embedAndGetFontObj({ pdfDoc, font, _cache }),
    getFontKitFont(schema.fontName, font, _cache),
    getFontProp({ value, font, schema, _cache, colorType }),
  ]);

  const { fontSize, color, alignment, verticalAlignment, lineHeight, characterSpacing } = fontProp;

  const fontName = (
      schema.fontName ? schema.fontName : getFallbackFontName(font)
  ) as keyof typeof pdfFontObj;
  const pdfFontValue = pdfFontObj && pdfFontObj[fontName];

  const pageHeight = page.getHeight();
  const {
    width,
    height,
    rotate,
    position: { x, y },
    opacity,
  } = convertForPdfLayoutProps({ schema, pageHeight, applyRotateTranslate: false });

  page.pushOperators(pdfLib.setCharacterSpacing(characterSpacing ?? DEFAULT_CHARACTER_SPACING));

  const firstLineTextHeight = heightOfFontAtSize(fontKitFont, fontSize);
  const descent = getFontDescentInPt(fontKitFont, fontSize);
  const halfLineHeightAdjustment = lineHeight === 0 ? 0 : ((lineHeight - 1) * fontSize) / 2;

  const lines = splitTextToSize({
    value,
    characterSpacing,
    fontSize,
    fontKitFont,
    boxWidthInPt: width,
  });

  let yOffset = 0;
  if (verticalAlignment === 'top') {
    yOffset = firstLineTextHeight + halfLineHeightAdjustment;
  } else {
    const otherLinesHeight = lineHeight * fontSize * (lines.length - 1);

    if (verticalAlignment === 'bottom') {
      yOffset = height - otherLinesHeight + descent - halfLineHeightAdjustment;
    } else if (verticalAlignment === 'middle') {
      yOffset =
          (height - otherLinesHeight - firstLineTextHeight + descent) / 2 + firstLineTextHeight;
    }
  }

  const pivotPoint = { x: x + width / 2, y: pageHeight - mm2pt(schema.position.y) - height / 2 };

  // Render the label
  page.drawText('Label:', {
    x: x,
    y: pageHeight - mm2pt(schema.position.y) - yOffset,
    size: fontSize,
    font: pdfFontValue,
    color,
    opacity,
  });

  // Render the radio buttons
  const radioButtonY = pageHeight - mm2pt(schema.position.y) - yOffset - 20;
  const radioButtonX = x + 50;
  const radioButtonSize = 10;

  for (let i = 0; i < 3; i++) {
    page.drawCircle({
      x: radioButtonX,
      y: radioButtonY - i * 20,
      size: radioButtonSize,
      color,
      opacity,
    });
    page.drawText(`Option ${i + 1}`, {
      x: radioButtonX + 20,
      y: radioButtonY - i * 20 - 5,
      size: fontSize,
      font: pdfFontValue,
      color,
      opacity,
    });
  }
};