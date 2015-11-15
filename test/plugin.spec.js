import BabelRootImportPlugin from '../plugin';
import * as babel from 'babel-core';

describe('Babel Root Import', () => {
  let babelRootImportPlugin, plugin;

  beforeEach(() => {
    plugin = BabelRootImportPlugin();
  });

  describe('Class', () => {
    it('returns the root path', () => {
      const rootByProcess = process.cwd();
      expect(plugin.root).to.equal(rootByProcess);
    });
  });

  describe('transformRelativeToRootPath', () => {
    it('returns a string', () => {
      const func = plugin.transformRelativeToRootPath('');
      expect(func).to.be.a('string');
    });

    it('transforms given path relative root-path', () => {
      const rootPath = `${process.cwd()}/some/path`;
      const result = plugin.transformRelativeToRootPath('~/some/path');
      expect(result).to.equal(rootPath);
    });

    it('throws error if no string is passed', () => {
      expect(() => {
        plugin.transformRelativeToRootPath();
      }).to.throw(Error);
    });
  });

  describe('hasTildeInString', () => {
    it('returns a boolean', () => {
      const func = plugin.hasTildeInString();
      expect(func).to.be.a('boolean');
    });

    it('check if a "~/" is at the beginning of the string', () => {
      const withoutTilde = plugin.hasTildeInString('some/path');
      const withTilde = plugin.hasTildeInString('~/some/path');
      expect(withoutTilde).to.be.false;
      expect(withTilde).to.be.true;
    });

    it('returns false if no string is passed', () => {
      const nothingPassed = plugin.hasTildeInString();
      const wrongTypePassed = plugin.hasTildeInString([]);
      expect(nothingPassed).to.be.false;
      expect(wrongTypePassed).to.be.false;
    });
  });

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
