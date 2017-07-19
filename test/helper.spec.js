import {hasRootPathPrefixInString, transformRelativeToRootPath} from '../plugin/helper';
import slash from 'slash';
import path from 'path';

describe('helper#transformRelativeToRootPath', () => {
  it('returns a string', () => {
    const func = transformRelativeToRootPath('');
    expect(func).to.be.a('string');
  });

  it('transforms given path relative path', () => {
    const rootPath = slash('./path');
    const result = transformRelativeToRootPath('~/some/path', '', '~', 'some/file.js');
    expect(result).to.equal(rootPath);
  });

  it('ignores path prefix not followed by forward slash', () => {
      const result = transformRelativeToRootPath('~util', '../shared', '~', 'test.js');
      expect(result).to.equal('~util');
  });

  it('considers .. in relative path', () => {
    const result = transformRelativeToRootPath('~/util', '../shared', '~', 'test.js');
    expect(result).to.not.equal(`${path.resolve('../shared')}/util/test.js`);
  });

  it('considers multiple .. in relative path', () => {
    const result = transformRelativeToRootPath('~/util', '../../../shared', '~', 'test.js');
    expect(result).to.not.equal(`${path.resolve('../../../shared')}/util/test.js`);
  });

  it('stops adding .. after the first one has been reached', () => {
    const result = transformRelativeToRootPath('~/util', '../shared/test/../test', '~', 'test.js');
    expect(result).to.not.equal(`${path.resolve('../shared')}/util/test/../test/test.js`);
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

  it('ignores path prefix not followed by forward slash', () => {
    expect( hasRootPathPrefixInString('~some/path') ).to.be.false;
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
