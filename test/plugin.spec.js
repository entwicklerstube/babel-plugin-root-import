import * as babel from 'babel-core';
import slash from 'slash';

import BabelRootImportPlugin from '../plugin';

describe('Babel Root Import - Plugin', () => {
  it('transforms the relative path into an absolute path', () => {
    const targetRequire = slash(`${process.cwd()}/some/example.js`);
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
    const targetRequire = slash(`/some/custom/root/some/example.js`);
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

  it('uses the "@" as custom prefix to detect a root-import path', () => {
    const targetRequire = slash(`${process.cwd()}/some/example.js`);
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

  it('uses the "/" as custom prefix to detect a root-import path', () => {
    const targetRequire = slash(`${process.cwd()}/some/example.js`);
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
    const targetRequire = slash(`${process.cwd()}/some/example.js`);
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

  it('uses "@" as custom prefix to detect a root-import path and has a custom rootPathSuffix', () => {
    const targetRequire = slash(`${process.cwd()}/some/example.js`);
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
    const targetRequire = slash(`${process.cwd()}/some/' + 'example.js`);
    const transformedRequire = babel.transform("var SomeExample = require('~/some/' + 'example.js');", {
      plugins: [BabelRootImportPlugin]
    });

    expect(transformedRequire.code).to.contain(targetRequire);
  });

  it('does not transform a multipart require path with variable at the beginning', () => {
    const targetRequire = slash(`${process.cwd()}/some' + '/example.js`);
    const transformedRequire = babel.transform("var some = '~/';var SomeExample = require(some+ '/example.js');", {
      plugins: [BabelRootImportPlugin]
    });

    expect(transformedRequire.code).to.not.contain(targetRequire);
  });
});
