import { PDFRenderProps } from '@pdfme/common';
import {RadioButtonGroupSchema} from './types';
import { pdfRender as parentPdfRender } from '../text/pdfRender';

export const pdfRender = async (arg: PDFRenderProps<RadioButtonGroupSchema>) => {
  const { value, schema, ...rest } = arg;

  const renderArgs = {
    value: schema.text || '',
    schema,
    ...rest,
  };

  await parentPdfRender(renderArgs);
};
