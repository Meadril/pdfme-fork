import multiVariableText from './multiVariableText/index.js';
import radioButtonGroup from './radioButtonGroup/index.js';
import checkBox from './checkBox/index.js';
import text from './text/index.js';
import image from './graphics/image.js';
import svg from './graphics/svg.js';
import barcodes from './barcodes/index.js';
import line from './shapes/shapes.js';
import table from './tables/index.js';
import { rectangle, ellipse } from './shapes/rectAndEllipse.js';

const builtInPlugins = { Text: text };

export {
  builtInPlugins,
  // schemas
  text,
  multiVariableText,
  image,
  svg,
  table,
  barcodes,
  line,
  rectangle,
  ellipse,
  radioButtonGroup,
  checkBox
};