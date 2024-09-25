import {Schema, Plugin, PDFRenderProps, UIRenderProps, mm2pt} from '@pdfme/common';
import { rotatePoint, convertForPdfLayoutProps, hex2PrintingColor } from '../utils.js';
import { HEX_COLOR_PATTERN } from '../constants.js';

const DEFAULT_COLOR = '#000000';

interface ShapeSchema extends Schema {
  color: string;
  shapeType: 'line' | 'rectangle' | 'ellipse' | 'triangle' | 'polygon' | 'star';
  numberOfSides?: number;
}

const shapeSchema: Plugin<ShapeSchema> = {
  pdf: (arg: PDFRenderProps<ShapeSchema>) => {
    const { page, schema, options } = arg;
    if (!schema.color) return;

    const { colorType } = options;
    const pageHeight = page.getHeight();
    const {
      width,
      height,
      rotate,
      position: { x, y },
      opacity,
    } = convertForPdfLayoutProps({ schema, pageHeight, applyRotateTranslate: false });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const borderWidth = schema.borderWidth ? mm2pt(schema.borderWidth) : 0;

    const pivot = { x: x + width / 2, y: y + height / 2 };
    const color = hex2PrintingColor(schema.color ?? DEFAULT_COLOR, colorType);

    switch (schema.shapeType) {
      case 'line': {
        page.drawLine({
          start: rotatePoint({ x, y: y + height / 2 }, pivot, rotate.angle),
          end: rotatePoint({ x: x + width, y: y + height / 2 }, pivot, rotate.angle),
          thickness: height,
          color,
          opacity,
        });
        break;
      }

      case 'rectangle': {
        page.drawRectangle({
          x,
          y,
          width,
          height,
          color,
          opacity,
        });
        break;
      }

      case 'ellipse': {
        page.drawEllipse({
          x: x + width / 2,
          y: y + height / 2,
          xScale: width / 2 - borderWidth / 2,
          yScale: height / 2 - borderWidth / 2,
          color,
          opacity,
        });
        break;
      }

      case 'triangle': {
        const points = [
          { x: x + width / 2, y: y + height },
          { x: x + width, y },
          { x, y },
        ];
        const path = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;
        page.drawSvgPath(path, {
          color: hex2PrintingColor(schema.color ?? DEFAULT_COLOR, colorType),
          borderColor: hex2PrintingColor(DEFAULT_COLOR, colorType),
          borderWidth: 1,
          opacity,
        });
        break;
      }

      case 'polygon': {
        const numberOfSides = schema.numberOfSides ?? 6;
        const radius = Math.min(width, height) / 2;
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        const points = [];
        for (let i = 0; i < numberOfSides; i++) {
          const angle = (i * 2 * Math.PI) / numberOfSides;
          points.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          });
        }

        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

        page.drawSvgPath(path, {
          color: hex2PrintingColor(schema.color ?? DEFAULT_COLOR, colorType),
          borderColor: hex2PrintingColor(DEFAULT_COLOR, colorType),
          borderWidth: 1,
          opacity,
        });
        break;
      }

      case 'star': {
        const numberOfPoints = schema.numberOfSides ?? 5;
        const outerRadius = Math.min(width, height) / 2;
        const innerRadius = outerRadius / 2;
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        const points = [];
        for (let i = 0; i < numberOfPoints * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / numberOfPoints;
          points.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          });
        }

        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

        page.drawSvgPath(path, {
          color: hex2PrintingColor(schema.color ?? DEFAULT_COLOR, colorType),
          borderColor: hex2PrintingColor(DEFAULT_COLOR, colorType),
          borderWidth: 1,
          opacity,
        });
        break;
      }

      default:
        return;
    }
  },
  ui: (arg: UIRenderProps<ShapeSchema>) => {
    const { schema, rootElement } = arg;
    rootElement.innerHTML = '';

    switch (schema.shapeType) {
      case 'rectangle': {
        const div = document.createElement('div');
        div.style.backgroundColor = schema.color ?? 'transparent';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.borderRadius = '0';
        rootElement.appendChild(div);
        break;
      }

      case 'ellipse': {
        const div = document.createElement('div');
        div.style.backgroundColor = schema.color ?? 'transparent';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.borderRadius = '50%';
        rootElement.appendChild(div);
        break;
      }

      case 'line': {
        const div = document.createElement('div');
        div.style.backgroundColor = schema.color ?? 'transparent';
        div.style.width = '100%';
        div.style.height = '100%';
        rootElement.appendChild(div);
        break;
      }

      case 'triangle': {
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.style.width = '0';
        div.style.height = '0';
        const containerWidth = rootElement.clientWidth;
        const containerHeight = rootElement.clientHeight;
        div.style.borderLeft = `${containerWidth / 2}px solid transparent`;
        div.style.borderRight = `${containerWidth / 2}px solid transparent`;
        div.style.borderBottom = `${containerHeight}px solid ${schema.color}`;
        rootElement.appendChild(div);
        break;
      }

      case 'polygon': {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const numberOfSides = schema.numberOfSides ?? 6;
        const radius = Math.min(rootElement.clientWidth, rootElement.clientHeight) / 2;
        const centerX = rootElement.clientWidth / 2;
        const centerY = rootElement.clientHeight / 2;
        const points = [];
        for (let i = 0; i < numberOfSides; i++) {
          const angle = (i * 2 * Math.PI) / numberOfSides;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          points.push(`${x},${y}`);
        }
        polygon.setAttribute('points', points.join(' '));
        polygon.setAttribute('fill', schema.color ?? 'transparent');
        svg.appendChild(polygon);
        rootElement.appendChild(svg);
        break;
      }

      case 'star': {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const numberOfPoints = schema.numberOfSides ?? 5;
        const outerRadius = Math.min(rootElement.clientWidth, rootElement.clientHeight) / 2;
        const innerRadius = outerRadius / 2;
        const centerX = rootElement.clientWidth / 2;
        const centerY = rootElement.clientHeight / 2;
        const points = [];
        for (let i = 0; i < numberOfPoints * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / numberOfPoints;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          points.push(`${x},${y}`);
        }
        polygon.setAttribute('points', points.join(' '));
        polygon.setAttribute('fill', schema.color ?? 'transparent');
        svg.appendChild(polygon);
        rootElement.appendChild(svg);
        break;
      }

      default:
        break;
    }
  },
  propPanel: {
    schema: ({ i18n }) => ({
      shapeType: {
        title: i18n('schemas.shapeType'),
        type: 'string',
        widget: 'select',
        enum: ['line', 'rectangle', 'ellipse', 'triangle', 'polygon', 'star'],
        required: true,
      },
      color: {
        title: i18n('schemas.color'),
        type: 'string',
        widget: 'color',
        required: true,
        rules: [{ pattern: HEX_COLOR_PATTERN, message: i18n('validation.hexColor') }],
      },
      numberOfSides: {
        title: i18n('schemas.numberOfSides'),
        type: 'number',
        min: 3,
        max: 100,
        default: 5,
        required: false,
      },
    }),
    defaultSchema: {
      name: 'Shape',
      type: 'shape',
      shapeType: 'line',
      position: { x: 0, y: 0 },
      width: 50,
      height: 1,
      rotate: 0,
      opacity: 1,
      readOnly: true,
      color: DEFAULT_COLOR,
    },
  },
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shape"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/></svg>',
};

export default shapeSchema;
