import BabelRootImportHelper from '../plugin/helper';

describe('Babel Root Import - Helper', () => {

  describe('transformRelativeToRootPath', () => {
      it('returns a string', () => {
        console.log(BabelRootImportHelper().transformRelativeToRootPath(''));
        const func = BabelRootImportHelper().transformRelativeToRootPath('');
        expect(func).to.be.a('string');
      });

      it('transforms given path relative root-path', () => {
        const rootPath = `${process.cwd()}/some/path`;
        const result = BabelRootImportHelper().transformRelativeToRootPath('~/some/path');
        expect(result).to.equal(rootPath);
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
      const func = BabelRootImportHelper().transformRelativeToRootPath('');
      expect(func).to.be.a('string');
    });

    it('transforms given path relative root-path', () => {
      const rootPath = `${process.cwd()}/some/path`;
      const result = BabelRootImportHelper().transformRelativeToRootPath('~/some/path');
      expect(result).to.equal(rootPath);
    });

    it('throws error if no string is passed', () => {
      expect(() => {
        BabelRootImportHelper().transformRelativeToRootPath();
      }).to.throw(Error);
    });
  });

  describe('hasTildeInString', () => {
    it('returns a boolean', () => {
      const func = BabelRootImportHelper().hasTildeInString();
      expect(func).to.be.a('boolean');
    });

    it('check if a "~/" is at the beginning of the string', () => {
      const withoutTilde = BabelRootImportHelper().hasTildeInString('some/path');
      const withTilde = BabelRootImportHelper().hasTildeInString('~/some/path');
      expect(withoutTilde).to.be.false;
      expect(withTilde).to.be.true;
    });

    it('returns false if no string is passed', () => {
      const nothingPassed = BabelRootImportHelper().hasTildeInString();
      const wrongTypePassed = BabelRootImportHelper().hasTildeInString([]);
      expect(nothingPassed).to.be.false;
      expect(wrongTypePassed).to.be.false;
    });
  });
});
