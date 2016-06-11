import slash from 'slash';
import BabelRootImportHelper from '../plugin/helper';

describe('Babel Root Import - Helper', () => {
  describe('transformRelativeToRootPath', () => {
    it('returns a string', () => {
      const func = BabelRootImportHelper().transformRelativeToRootPath('');

      expect(func).to.be.a('string');
    });

    it('transforms given path relative root-path with ~ rootPathSuffix', () => {
      const rootPath = slash(`${process.cwd()}/some/path`);
      const result = BabelRootImportHelper().transformRelativeToRootPath('~/some/path');

      expect(result).to.equal(rootPath);
    });

    it('transforms path as relative root-path with "" rootPathSuffix', () => {
      const rootPath = slash(`${process.cwd()}/some/path`);
      const result = BabelRootImportHelper().transformRelativeToRootPath('some/path', null, '');

      expect(result).to.equal(rootPath);
    });

    it('transforms path as relative root-path with / rootPathSuffix', () => {
      const rootPath = slash(`${process.cwd()}/some/path`);
      const result = BabelRootImportHelper().transformRelativeToRootPath('/some/path', null, '/');

      expect(result).to.equal(rootPath);
    });

    it('returns original path if with "" rootPathSuffix and is in node_modules', () => {
      const result = BabelRootImportHelper().transformRelativeToRootPath('slash', null, '');

      expect(result).to.equal('slash');
    });

    it('throws error if no string is passed', () => {
      expect(() => {
        BabelRootImportHelper().transformRelativeToRootPath();
      }).to.throw(Error);
    });
  });

  describe('Class', () => {
    it('returns the root path', () => {
      const rootByProcess = slash(process.cwd());

      expect(BabelRootImportHelper().root).to.equal(rootByProcess);
    });
  });

  describe('hasRootPathPrefixInString', () => {
    it('returns a boolean', () => {
      const func = BabelRootImportHelper().hasRootPathPrefixInString();

      expect(func).to.be.a('boolean');
    });

    it('check if "~/" is at the beginning of the string', () => {
      const withoutRootPathPrefix = BabelRootImportHelper().hasRootPathPrefixInString('some/path');
      const withRootPathPrefix = BabelRootImportHelper().hasRootPathPrefixInString('~/some/path');

      expect(withoutRootPathPrefix).to.be.false;
      expect(withRootPathPrefix).to.be.true;
    });

    it('returns true if empty rootPathSuffix', () => {
      const hasRootPathPrefix = BabelRootImportHelper().hasRootPathPrefixInString('some/path', null, '');

      expect(hasRootPathPrefix).to.be.true;
    });

    it('returns false if empty rootPathSuffix and string starts with /', () => {
      const hasRootPathPrefix = BabelRootImportHelper().hasRootPathPrefixInString('/some/path', null, '');

      expect(hasRootPathPrefix).to.be.false;
    });

    it('returns false if empty rootPathSuffix and string starts with ./', () => {
      const hasRootPathPrefix = BabelRootImportHelper().hasRootPathPrefixInString('./some/path', null, '');

      expect(hasRootPathPrefix).to.be.false;
    });

    it('returns false if empty rootPathSuffix and string starts with .', () => {
      const hasRootPathPrefix = BabelRootImportHelper().hasRootPathPrefixInString('../some/path', null, '');

      expect(hasRootPathPrefix).to.be.false;
    });

    it('returns false if no string is passed', () => {
      const nothingPassed = BabelRootImportHelper().hasRootPathPrefixInString();
      const wrongTypePassed = BabelRootImportHelper().hasRootPathPrefixInString([]);

      expect(nothingPassed).to.be.false;
      expect(wrongTypePassed).to.be.false;
    });
  });
});
