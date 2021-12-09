import { ReactNode } from 'react';
import { zoom, rulerHeight } from '../libs/constants';
import { TemplateSchema, Schema, PageSize } from '../libs/type';

const Paper = ({
  scale,
  schemas,
  pageSizes,
  backgrounds,
  render,
}: {
  scale: number;
  schemas: {
    [key: string]: Schema | TemplateSchema;
  }[];
  pageSizes: PageSize[];
  backgrounds: string[];
  render: ({
    index,
    schema,
    paperSize,
  }: {
    index: number;
    schema: {
      [key: string]: Schema | TemplateSchema;
    };
    paperSize: PageSize;
  }) => ReactNode;
}) => (
  <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
    {schemas.map((schema, index) => {
      const pageSize = pageSizes[index];
      if (!pageSize) {
        return null;
      }
      const paperSize = { width: pageSize.width * zoom, height: pageSize.height * zoom };
      const background = backgrounds[index] || '';
      return (
        <div
          key={index}
          style={{ margin: `${rulerHeight}px auto`, position: 'relative', ...paperSize }}
        >
          <div id={`paper-${index}`}>{render({ index, schema, paperSize })}</div>
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              ...paperSize,
            }}
          />
        </div>
      );
    })}
  </div>
);

export default Paper;
