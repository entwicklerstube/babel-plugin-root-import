import slash from 'slash';

import BabelRootImportPlugin from '../plugin';
import { babelTransform, importSyntaxPlugin } from './babel-helpers';

describe('Babel Root Import - Plugin', () => {
  it('transforms the relative path into an absolute path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babelTransform(
      "import SomeExample from '~/some/example.js';",
      {
        plugins: [BabelRootImportPlugin],
      },
    );
    const transformedRequire = babelTransform(
      "var SomeExample = require('~/some/example.js');",
      {
        plugins: [BabelRootImportPlugin],
      },
    );
    const transformedRequireResolve = babelTransform(
      "var SomeExample = require.resolve('~/some/example.js');",
      {
        plugins: [BabelRootImportPlugin],
      },
    );

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
    expect(transformedRequireResolve.code).to.contain(targetRequire);
  });

  it('transforms for import() syntax', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformed = babelTransform(
      "var SomeExample = import('~/some/example.js');",
      {
        plugins: [importSyntaxPlugin, BabelRootImportPlugin],
      },
    );

    expect(transformed.code).to.contain(targetRequire);
  });

  it('transforms for custom functions', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformed = babelTransform(
      "var SomeExample = jest.mock('~/some/example.js');",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              functions: ['jest.mock'],
            },
          ],
        ],
      },
    );

    expect(transformed.code).to.contain(targetRequire);
  });

  it('transforms the relative path into an absolute path with the configured root-path', () => {
    const targetRequire = slash('/some/custom/root/some/example.js');
    const transformedImport = babelTransform(
      "import SomeExample from '~/some/example.js';",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathSuffix: 'some/custom/root',
            },
          ],
        ],
      },
    );
    const transformedRequire = babelTransform(
      "var SomeExample = require('~/some/example.js');",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathSuffix: 'some/custom/root',
            },
          ],
        ],
      },
    );

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('transforms the relative paths into an absolute paths with the configured root-paths', () => {
    const paths = [
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'some1/custom/root',
      },
      {
        rootPathPrefix: '@',
        rootPathSuffix: 'some2/custom/root',
      },
    ];
    const pluginConfig = process.env.BABEL_VERSION === '7' ? { paths } : paths;
    const plugins = [[BabelRootImportPlugin, pluginConfig]];

    const targetRequire1 = slash(`/some1/custom/root/some/example.js`);
    const transformedImport1 = babelTransform(
      "import SomeExample from '~/some/example.js';",
      {
        plugins,
      },
    );
    const transformedRequire1 = babelTransform(
      "var SomeExample = require('~/some/example.js');",
      {
        plugins,
      },
    );

    const targetRequire2 = slash(`/some2/custom/root/some/example.js`);
    const transformedImport2 = babelTransform(
      "import SomeExample from '@/some/example.js';",
      {
        plugins,
      },
    );
    const transformedRequire2 = babelTransform(
      "var SomeExample = require('@/some/example.js');",
      {
        plugins,
      },
    );

    expect(transformedImport1.code).to.contain(targetRequire1);
    expect(transformedRequire1.code).to.contain(targetRequire1);
    expect(transformedImport2.code).to.contain(targetRequire2);
    expect(transformedRequire2.code).to.contain(targetRequire2);
  });

  it('uses the "@" as custom prefix to detect a root-import path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babelTransform(
      "import SomeExample from '@/some/example.js';",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '@',
            },
          ],
        ],
      },
    );
    const transformedRequire = babelTransform(
      "var SomeExample = require('@/some/example.js');",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '@',
            },
          ],
        ],
      },
    );

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('supports re-export syntax (export * from ... or export { named } from ...)', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedExportAll = babelTransform(
      "export * from '@/some/example.js';",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '@',
            },
          ],
        ],
      },
    );
    const transformedExportNamed = babelTransform(
      "export { named } from '@/some/example.js';",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '@',
            },
          ],
        ],
      },
    );
    expect(transformedExportNamed.code).to.contain(targetRequire);
    expect(transformedExportAll.code).to.contain(targetRequire);
  });

  it('uses the "/" as custom prefix to detect a root-import path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babelTransform(
      "import SomeExample from '/some/example.js';",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '/',
            },
          ],
        ],
      },
    );
    const transformedRequire = babelTransform(
      "var SomeExample = require('/some/example.js');",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '/',
            },
          ],
        ],
      },
    );

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('uses the "–" as custom prefix to detect a root-import path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babelTransform(
      "import SomeExample from '-/some/example.js';",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '-',
            },
          ],
        ],
      },
    );
    const transformedRequire = babelTransform(
      "var SomeExample = require('-/some/example.js');",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '-',
            },
          ],
        ],
      },
    );

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('uses "@" as custom prefix to detect a root-import path and has a custom rootPathSuffix', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babelTransform(
      "import SomeExample from '@/example.js';",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '@',
              rootPathSuffix: 'some',
            },
          ],
        ],
      },
    );
    const transformedRequire = babelTransform(
      "var SomeExample = require('@/example.js');",
      {
        plugins: [
          [
            BabelRootImportPlugin,
            {
              rootPathPrefix: '@',
              rootPathSuffix: 'some',
            },
          ],
        ],
      },
    );

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('transforms a multipart require path with string at the beginning', () => {
    const transformedRequire1 = babelTransform(
      "var SomeExample = require('~/some/' + 'example.js');",
      {
        plugins: [BabelRootImportPlugin],
      },
    );

    expect(transformedRequire1.code).to.be.oneOf([
      `var SomeExample = require('./some/' + 'example.js');`, // babel 6
      `var SomeExample = require("./some/" + 'example.js');`, // babel 7
    ]);

    const transformedRequire2 = babelTransform(
      "var SomeExample = require('~/some/' + 'other' + 'example.js');",
      {
        plugins: [BabelRootImportPlugin],
      },
    );

    expect(transformedRequire2.code).to.contain.oneOf([
      `var SomeExample = require('./some/' + 'other' + 'example.js');`, // babel 6
      `var SomeExample = require("./some/" + 'other' + 'example.js');`, // babel 7
    ]);
  });

  it('does not transform a multipart require path with variable at the beginning', () => {
    const targetRequire = slash(`/some' + '/example.js`);
    const transformedRequire = babelTransform(
      "var some = '~/';var SomeExample = require(some+ '/example.js');",
      {
        plugins: [BabelRootImportPlugin],
      },
    );

    expect(transformedRequire.code).to.not.contain(targetRequire);
  });

  it('Considers .. Statements in relative Paths', () => {
    const paths = [
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'some1/custom/root',
      },
      {
        rootPathPrefix: '@',
        rootPathSuffix: '../../some2/custom/../custom/root',
      },
    ];
    const pluginConfig = process.env.BABEL_VERSION === '7' ? { paths } : paths;
    const plugins = [[BabelRootImportPlugin, pluginConfig]];

    const targetRequire1 = slash(`/some1/custom/root/some/example.js`);
    const transformedImport1 = babelTransform(
      "import SomeExample from '~/some/example.js';",
      {
        plugins,
      },
    );
    const transformedRequire1 = babelTransform(
      "var SomeExample = require('~/some/example.js');",
      {
        plugins,
      },
    );

    const targetRequire2 = slash(`../../some2/custom/root/some/example.js`);
    const transformedImport2 = babelTransform(
      "import SomeExample from '@/some/example.js';",
      {
        plugins,
      },
    );
    const transformedRequire2 = babelTransform(
      "var SomeExample = require('@/some/example.js');",
      {
        plugins,
      },
    );

    expect(transformedImport1.code).to.contain(targetRequire1);
    expect(transformedRequire1.code).to.contain(targetRequire1);
    expect(transformedImport2.code).to.contain(targetRequire2);
    expect(transformedRequire2.code).to.contain(targetRequire2);
  });
});
