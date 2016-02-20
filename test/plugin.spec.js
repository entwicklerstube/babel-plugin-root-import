import BabelRootImportPlugin from '../plugin';
import * as babel from 'babel-core';

describe('Babel Root Import - Plugin', () => {

  before(setupPath);
  after(resetPath);

  describe('Babel Plugin', () => {
    it('transforms the relative path into an absolute path', () => {
      const targetRequire = `${process.cwd()}/some/example.js`;
      const transformedCode = babel.transform("import SomeExample from '~/some/example.js';", {
        plugins: [BabelRootImportPlugin]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });

    it('transforms the relative path into an absolute path with the configured root-path', () => {
      const targetRequire = `/some/custom/root/some/example.js`;
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
      const targetRequire = `${process.cwd()}/some/example.js`;
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
      const targetRequire = `${process.cwd()}/some/example.js`;
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
      const targetRequire = `${process.cwd()}/some/example.js`;
      const transformedCode = babel.transform("import SomeExample from '-/some/example.js';", {
        plugins: [[
          BabelRootImportPlugin, {
            rootPathPrefix: '-'
          }
        ]]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });
  });
});
