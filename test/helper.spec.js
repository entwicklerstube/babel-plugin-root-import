import {hasRootPathPrefixInString, transformRelativeToRootPath} from '../plugin/helper';
import slash from 'slash';

describe('helper#transformRelativeToRootPath', () => {
  it('returns a string', () => {
    const func = transformRelativeToRootPath('');
    expect(func).to.be.a('string');
  });

  it('transforms given path relative root-path', () => {
    const rootPath = slash(`${process.cwd()}/some/path`);
    const result = transformRelativeToRootPath('~/some/path');
    expect(result).to.equal(rootPath);
  });

  it('throws error if no string is passed', () => {
    expect(() => {
      transformRelativeToRootPath();
    }).to.throw(Error);
  });
});

describe('helper#hasRootPathPrefixInString', () => {
  it('returns a boolean', () => {
    const func = hasRootPathPrefixInString();
    expect(func).to.be.a('boolean');
  });

  it('check if "~/" is at the beginning of the string', () => {
    const withoutRootPathPrefix = hasRootPathPrefixInString('some/path');
    const withRootPathPrefix = hasRootPathPrefixInString('~/some/path');
    expect(withoutRootPathPrefix).to.be.false;
    expect(withRootPathPrefix).to.be.true;
  });

  it('returns false if no string is passed', () => {
    const nothingPassed = hasRootPathPrefixInString();
    const wrongTypePassed = hasRootPathPrefixInString([]);
    expect(nothingPassed).to.be.false;
    expect(wrongTypePassed).to.be.false;
  });
});
