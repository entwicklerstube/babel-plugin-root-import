import * as babel from 'babel-core';
import slash from 'slash';
import BabelRootImportPlugin from '../plugin';

describe('Babel Root Import - Plugin', () => {
  describe('Babel Plugin', () => {
    it('transforms the relative path into an absolute path', () => {
      const targetRequire = slash(`${process.cwd()}/some/example.js`);
      const transformedCode = babel.transform("import SomeExample from '~/some/example.js';", {
        plugins: [BabelRootImportPlugin]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });

    it('transforms the relative path into an absolute path with the configured root-path', () => {
      const targetRequire = slash('/some/custom/root/some/example.js');
      const transformedCode = babel.transform("import SomeExample from '~/some/example.js';", {
        plugins: [[
          BabelRootImportPlugin, {
            rootPathSuffix: 'some/custom/root'
          }
        ]]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });

    it('uses the "@" as custom prefix to detect a root-import path', () => {
      const targetRequire = slash(`${process.cwd()}/some/example.js`);
      const transformedCode = babel.transform("import SomeExample from '@/some/example.js';", {
        plugins: [[
          BabelRootImportPlugin, {
            rootPathPrefix: '@'
          }
        ]]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });

    it('uses the "/" as custom prefix to detect a root-import path', () => {
      const targetRequire = slash(`${process.cwd()}/some/example.js`);
      const transformedCode = babel.transform("import SomeExample from '/some/example.js';", {
        plugins: [[
          BabelRootImportPlugin, {
            rootPathPrefix: '/'
          }
        ]]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });

    it('uses the "–" as custom prefix to detect a root-import path', () => {
      const targetRequire = slash(`${process.cwd()}/some/example.js`);
      const transformedCode = babel.transform("import SomeExample from '-/some/example.js';", {
        plugins: [[
          BabelRootImportPlugin, {
            rootPathPrefix: '-'
          }
        ]]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });

    it('uses empty string as custom prefix to detect a root-import path', () => {
      const targetRequire = slash(`${process.cwd()}/some/example.js`);
      const transformedCode = babel.transform("import SomeExample from 'some/example.js';", {
        plugins: [[
          BabelRootImportPlugin, {
            rootPathPrefix: ''
          }
        ]]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });

    it('uses "@" as custom prefix to detect a root-import path and has a custom rootPathSuffix', () => {
      const targetRequire = slash(`${process.cwd()}/some/example.js`);
      const transformedCode = babel.transform("import SomeExample from '@/example.js';", {
        plugins: [[
          BabelRootImportPlugin, {
            rootPathPrefix: '@',
            rootPathSuffix: 'some'
          }
        ]]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });
  });
});
