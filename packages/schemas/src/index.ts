import multiVariableText from './multiVariableText/index.js';
import text from './text/index.js';
import image from './graphics/image.js';
import svg from './graphics/svg.js';
import barcodes from './barcodes/index.js';
import line from './shapes/shapes.js';
import table from './tables/index.js';
import measurementPoint from "./measurementPoint";
import { rectangle, ellipse } from './shapes/rectAndEllipse.js';
import dateTime from './date/dateTime';
import date from './date/date';
import time from './date/time';
import select from './select/index';
import radioGroup from './radioGroup/index';
import checkBox from "./checkBox/index";

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
  dateTime,
  date,
  time,
  select,
  radioGroup,
  checkBox,
  measurementPoint,
};
