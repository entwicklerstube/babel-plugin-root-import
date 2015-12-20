import BabelRootImportHelper from '../plugin/helper';
import path from 'path';

describe('Babel Root Import - Helper', () => {

  describe('transformRelativeToRootPath', () => {
      it('returns a string', () => {
        console.log(BabelRootImportHelper().transformRelativeToRootPath(''));
        const func = BabelRootImportHelper().transformRelativeToRootPath('');
        expect(func).to.be.a('string');
      });

      it('transforms given path relative root-path', () => {
        const result = BabelRootImportHelper().transformRelativeToRootPath('~/some/path');
        expect(result).to.equal('./some/path');
      });

      it('throws error if no string is passed', () => {
        expect(() => {
          BabelRootImportHelper().transformRelativeToRootPath();
        }).to.throw(Error);
      });
  });

  describe('Class', () => {
    it('returns the root path', () => {
      const rootByProcess = process.cwd();
      expect(BabelRootImportHelper().root).to.equal(rootByProcess);
    });
  });

  describe('transformRelativeToRootPath', () => {
    it('returns a string', () => {
      const func = BabelRootImportHelper().transformRelativeToRootPath('', __filename);
      expect(func).to.be.a('string');
    });

    it('transforms given path relative root-path', () => {
      const result = BabelRootImportHelper().transformRelativeToRootPath('~/some/path', __filename);
      expect(result).to.equal('./../some/path');
    });

    it('throws error if no string is passed', () => {
      expect(() => {
        BabelRootImportHelper().transformRelativeToRootPath();
      }).to.throw(Error);
    });
  });

  describe('transformWithRootPathSuffix', () => {
    it('returns a string', () => {
      const func = BabelRootImportHelper().transformRelativeToRootPath('', __filename, 'src');
      expect(func).to.be.a('string');
    });

    it('transforms given path relative root-path', () => {
      const result = BabelRootImportHelper().transformRelativeToRootPath('~/some/path', __filename, 'src');
      expect(result).to.equal('./../src/some/path');
    });

    it('throws error if no string is passed', () => {
      expect(() => {
        BabelRootImportHelper().transformRelativeToRootPath();
      }).to.throw(Error);
    });
  });

  describe('transformRelativeToClosestModule', () => {
    it('returns a string', () => {
      const func = BabelRootImportHelper().transformRelativeToRootPath('', __filename, '%/src');
      expect(func).to.be.a('string');
    });

    it('transforms given path relative root-path', () => {
      const otherModulePath = path.join(__dirname, '..', 'node_modules', 'mocha', 'index.js');
      const result = BabelRootImportHelper().transformRelativeToRootPath('~/some/path', otherModulePath, '%/src');
      expect(result).to.equal('./src/some/path');
    });

    it('throws error if no string is passed', () => {
      expect(() => {
        BabelRootImportHelper().transformRelativeToRootPath();
      }).to.throw(Error);
    });
  });

  describe('startsWith', () => {
    it('returns a boolean', () => {
      const func = BabelRootImportHelper().startsWith();
      expect(func).to.be.a('boolean');
    });

    it('check if a "~/" is at the beginning of the string', () => {
      const withoutTilde = BabelRootImportHelper().startsWith('some/path', '~/');
      const withTilde = BabelRootImportHelper().startsWith('~/some/path', '~/');
      expect(withoutTilde).to.be.false;
      expect(withTilde).to.be.true;
    });

    it('returns false if no string is passed', () => {
      const nothingPassed = BabelRootImportHelper().startsWith();
      const wrongTypePassed = BabelRootImportHelper().startsWith([]);
      expect(nothingPassed).to.be.false;
      expect(wrongTypePassed).to.be.false;
    });
  });
});
