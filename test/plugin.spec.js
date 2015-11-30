import BabelRootImportPlugin from '../plugin';
import * as babel from 'babel-core';

describe('Babel Root Import - Plugin', () => {
  describe('Babel Plugin', () => {
    it('transforms the relative path into an absolute path', () => {
      const targetRequire = `${process.cwd()}/some/example.js`;
      const transformedCode = babel.transform("import SomeExample from '~/some/example.js';", {
        plugins: [BabelRootImportPlugin]
      });

      expect(transformedCode.code).to.contain(targetRequire);
    });
  });
});
