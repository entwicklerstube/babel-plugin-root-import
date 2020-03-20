import {
  hasRootPathPrefixInString,
  transformRelativeToRootPath,
} from '../plugin/helper';
import slash from 'slash';
import path from 'path';

describe('helper#transformRelativeToRootPath', () => {
  it('returns a string', () => {
    const func = transformRelativeToRootPath('');
    expect(func).to.be.a('string');
  });

  it('transforms given path relative path', () => {
    const rootPath = slash('./path');
    const result = transformRelativeToRootPath(
      '~/some/path',
      '',
      '~',
      'some/file.js',
    );
    expect(result).to.equal(rootPath);
  });

  it('supports custom root', () => {
    const rootPath = slash('../../some/path');
    const parent = path.resolve('../');
    const result = transformRelativeToRootPath(
      '~/some/path',
      '',
      '~',
      'some/file.js',
      parent,
    );
    expect(result).to.equal(rootPath);
  });

  it('supports an absolute custom root path', () => {
    const importPath = '~/another/path';
    const root = '/root-directory';

    // The file is 2 directories down the custom root.
    const file = '/root-directory/some/path/file.js';
    
    const result = transformRelativeToRootPath(
      importPath,
      '',
      '~/',
      file,
      root
    );

    expect(result).to.equal('../../another/path')
  });


  it('supports custom root function', () => {
    const rootPath = slash('./internals/foo');
    const result = transformRelativeToRootPath(
      '~/foo',
      'internals',
      '~',
      'some/file.js',
      (source) => path.dirname(path.resolve(source)),
    );
    expect(result).to.equal(rootPath);
  });

  it('considers .. in relative path', () => {
    const result = transformRelativeToRootPath('~/util', '../shared', '~', 'test.js');
    expect(result).to.not.equal(`${path.resolve('../shared')}/util/test.js`);
  });

  it('considers multiple .. in relative path', () => {
    const result = transformRelativeToRootPath(
      '~/util',
      '../../../shared',
      '~',
      'test.js',
    );
    expect(result).to.not.equal(`${path.resolve('../../../shared')}/util/test.js`);
  });

  it('stops adding .. after the first one has been reached', () => {
    const result = transformRelativeToRootPath(
      '~/util',
      '../shared/test/../test',
      '~',
      'test.js',
    );
    expect(result).to.not.equal(
      `${path.resolve('../shared')}/util/test/../test/test.js`,
    );
  });

  it('works with long prefix and special characters', () => {
    const rootPath = slash('./path');
    const result = transformRelativeToRootPath(
      'common$^plop/some/path',
      '',
      'common$^plop',
      'some/file.js',
    );
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

  it('check if "common" is at the beginning of the string', () => {
    const withoutRootPathPrefix = hasRootPathPrefixInString('some/path', 'common');
    const withRootPathPrefix = hasRootPathPrefixInString(
      'common/some/path',
      'common',
    );
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
