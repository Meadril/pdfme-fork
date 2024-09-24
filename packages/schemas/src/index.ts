import multiVariableText from './multiVariableText/index.js';
import text, { readOnlyText } from './text/index.js';
import image, { readOnlyImage } from './graphics/image.js';
import svg, { readOnlySvg } from './graphics/svg.js';
import barcodes from './barcodes/index.js';
import line from './shapes/shapes';
import table from './tables/index.js';
import { getDynamicHeightsForTable } from './tables/dynamicTemplate.js';
import { rectangle, ellipse } from './shapes/rectAndEllipse.js';
import { convertForPdfLayoutProps, rotatePoint } from './utils.js';

const builtInPlugins = { Text: text };

export {
  // TODO remove
  readOnlyText,
  readOnlyImage,
  readOnlySvg,
  // schemas
  multiVariableText,
  text,
  image,
  svg,
  barcodes,
  line,
  table,
  rectangle,
  ellipse,
  // utils
  builtInPlugins,
  getDynamicHeightsForTable,
  convertForPdfLayoutProps,
  rotatePoint,
};