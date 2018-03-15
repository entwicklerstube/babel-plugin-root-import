import * as babel from 'babel-core';
import slash from 'slash';

import BabelRootImportPlugin from '../plugin';

describe('Babel Root Import - Plugin', () => {
  it('transforms the relative path into an absolute path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babel.transform("import SomeExample from '~/some/example.js';", {
      plugins: [BabelRootImportPlugin]
    });
    const transformedRequire = babel.transform("var SomeExample = require('~/some/example.js');", {
      plugins: [BabelRootImportPlugin]
    });

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('transforms the relative path into an absolute path with the configured root-path', () => {
    const targetRequire = slash('/some/custom/root/some/example.js');
    const transformedImport = babel.transform("import SomeExample from '~/some/example.js';", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathSuffix: 'some/custom/root'
        }
      ]]
    });
    const transformedRequire = babel.transform("var SomeExample = require('~/some/example.js');", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathSuffix: 'some/custom/root'
        }
      ]]
    });

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('transforms the relative paths into an absolute paths with the configured root-paths', () => {
    const plugins = [[
      BabelRootImportPlugin, [{
        rootPathPrefix: '~',
        rootPathSuffix: 'some1/custom/root'
      }, {
        rootPathPrefix: '@',
        rootPathSuffix: 'some2/custom/root'
      }]
    ]]

    const targetRequire1 = slash(`/some1/custom/root/some/example.js`);
    const transformedImport1 = babel.transform("import SomeExample from '~/some/example.js';", {
      plugins
    });
    const transformedRequire1 = babel.transform("var SomeExample = require('~/some/example.js');", {
      plugins
    });

    const targetRequire2 = slash(`/some2/custom/root/some/example.js`);
    const transformedImport2 = babel.transform("import SomeExample from '@/some/example.js';", {
      plugins
    });
    const transformedRequire2 = babel.transform("var SomeExample = require('@/some/example.js');", {
      plugins
    });

    expect(transformedImport1.code).to.contain(targetRequire1);
    expect(transformedRequire1.code).to.contain(targetRequire1);
    expect(transformedImport2.code).to.contain(targetRequire2);
    expect(transformedRequire2.code).to.contain(targetRequire2);
  });

  it('uses the "@" as custom prefix to detect a root-import path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babel.transform("import SomeExample from '@/some/example.js';", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '@'
        }
      ]]
    });
    const transformedRequire = babel.transform("var SomeExample = require('@/some/example.js');", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '@'
        }
      ]]
    });

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('supports re-export syntax (export * from ... or export { named } from ...)', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedExportAll = babel.transform("export * from '@/some/example.js';", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '@'
        }
      ]]
    });
    const transformedExportNamed = babel.transform("export { named } from '@/some/example.js';", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '@'
        }
      ]]
    });
    expect(transformedExportNamed.code).to.contain(targetRequire);
    expect(transformedExportAll.code).to.contain(targetRequire);
  });

  it('uses the "/" as custom prefix to detect a root-import path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babel.transform("import SomeExample from '/some/example.js';", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '/'
        }
      ]]
    });
    const transformedRequire = babel.transform("var SomeExample = require('/some/example.js');", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '/'
        }
      ]]
    });

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('uses the "–" as custom prefix to detect a root-import path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babel.transform("import SomeExample from '-/some/example.js';", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '-'
        }
      ]]
    });
    const transformedRequire = babel.transform("var SomeExample = require('-/some/example.js');", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '-'
        }
      ]]
    });

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('uses a custom string as a prefix to detect a root-import path', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babel.transform("import SomeExample from 'src/some/example.js';", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: 'src'
        }
      ]]
    });
    const transformedRequire = babel.transform("var SomeExample = require('src/some/example.js');", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: 'src'
        }
      ]]
    });

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('uses a custom string with multiple parts as a prefix to detect a root-import path', () => {
	const targetRequire = slash(`/some/example.js`);
	const transformedImport = babel.transform("import SomeExample from 'src/js/some/example.js';", {
	  plugins: [[
		BabelRootImportPlugin, {
		  rootPathPrefix: 'src/js'
		}
	  ]]
	});
	const transformedRequire = babel.transform("var SomeExample = require('src/js/some/example.js');", {
	  plugins: [[
		BabelRootImportPlugin, {
		  rootPathPrefix: 'src/js'
		}
	  ]]
	});

	expect(transformedImport.code).to.contain(targetRequire);
	expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('uses a custom string with trailing slash as a prefix to detect a root-import path', () => {
	const targetRequire = slash(`/some/example.js`);
	const transformedImport = babel.transform("import SomeExample from 'src/some/example.js';", {
	  plugins: [[
		BabelRootImportPlugin, {
		  rootPathPrefix: 'src/'
		}
	  ]]
	});
	const transformedRequire = babel.transform("var SomeExample = require('src/some/example.js');", {
	  plugins: [[
		BabelRootImportPlugin, {
		  rootPathPrefix: 'src/'
		}
	  ]]
	});

	expect(transformedImport.code).to.contain(targetRequire);
	expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('uses "@" as custom prefix to detect a root-import path and has a custom rootPathSuffix', () => {
    const targetRequire = slash(`/some/example.js`);
    const transformedImport = babel.transform("import SomeExample from '@/example.js';", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '@',
          rootPathSuffix: 'some'
        }
      ]]
    });
    const transformedRequire = babel.transform("var SomeExample = require('@/example.js');", {
      plugins: [[
        BabelRootImportPlugin, {
          rootPathPrefix: '@',
          rootPathSuffix: 'some'
        }
      ]]
    });

    expect(transformedImport.code).to.contain(targetRequire);
    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('transforms a multipart require path with string at the beginning', () => {
    const targetRequire1 = slash(`'./some/' + 'example.js'`);
    const transformedRequire1 = babel.transform("var SomeExample = require('~/some/' + 'example.js');", {
      plugins: [BabelRootImportPlugin]
    });

    expect(transformedRequire1.code).to.contain(targetRequire1);

    const targetRequire2 = slash(`'./some/' + 'other' + 'example.js'`);
    const transformedRequire2 = babel.transform("var SomeExample = require('~/some/' + 'other' + 'example.js');", {
      plugins: [BabelRootImportPlugin]
    });

    expect(transformedRequire2.code).to.contain(targetRequire2);
  });

  it('does not transform a multipart require path with variable at the beginning', () => {
    const targetRequire = slash(`/some' + '/example.js`);
    const transformedRequire = babel.transform("var some = '~/';var SomeExample = require(some+ '/example.js');", {
      plugins: [BabelRootImportPlugin]
    });

    expect(transformedRequire.code).to.not.contain(targetRequire);
  });

  it('Considers .. Statements in relative Paths', () => {
    const plugins = [[
      BabelRootImportPlugin, [{
        rootPathPrefix: '~',
        rootPathSuffix: 'some1/custom/root'
      }, {
        rootPathPrefix: '@',
        rootPathSuffix: '../../some2/custom/../custom/root'
      }]
    ]]

    const targetRequire1 = slash(`/some1/custom/root/some/example.js`);
    const transformedImport1 = babel.transform("import SomeExample from '~/some/example.js';", {
      plugins
    });
    const transformedRequire1 = babel.transform("var SomeExample = require('~/some/example.js');", {
      plugins
    });

    const targetRequire2 = slash(`../../some2/custom/root/some/example.js`);
    const transformedImport2 = babel.transform("import SomeExample from '@/some/example.js';", {
      plugins
    });
    const transformedRequire2 = babel.transform("var SomeExample = require('@/some/example.js');", {
      plugins
    });

    expect(transformedImport1.code).to.contain(targetRequire1);
    expect(transformedRequire1.code).to.contain(targetRequire1);
    expect(transformedImport2.code).to.contain(targetRequire2);
    expect(transformedRequire2.code).to.contain(targetRequire2);
  });
});
