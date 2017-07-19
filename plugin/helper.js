import slash from 'slash';
import path from 'path';

const root = slash(global.rootPath || process.cwd());

export const hasRootPathPrefixInString = (importPath, rootPathPrefix = '~') => {
  let containsRootPathPrefix = false;

  if (typeof importPath === 'string') {
    const firstTwoCharactersOfString = importPath.substring(0, 2);
    if (firstTwoCharactersOfString === `${rootPathPrefix}/`) {
      containsRootPathPrefix = true;
    }
  }

  return containsRootPathPrefix;
};

export const transformRelativeToRootPath = (importPath, rootPathSuffix, rootPathPrefix, sourceFile = '') => {
  let withoutRootPathPrefix = '';
  if (hasRootPathPrefixInString(importPath, rootPathPrefix)) {
    if (importPath.substring(0, 1) === '/') {
      withoutRootPathPrefix = importPath.substring(1, importPath.length);
    } else {
      withoutRootPathPrefix = importPath.substring(2, importPath.length);
    }

    const absolutePath = path.resolve(`${rootPathSuffix ? rootPathSuffix : './'}/${withoutRootPathPrefix}`);
    let sourcePath = sourceFile.substring(0, sourceFile.lastIndexOf('/'));

    // if the path is an absolute path (webpack sends '/Users/foo/bar/baz.js' here)
    if (sourcePath.indexOf('/') === 0 || sourcePath.indexOf(':/') === 1 || sourcePath.indexOf(':\\') === 1) {
      sourcePath = sourcePath.substring(root.length + 1);
    }

    sourcePath = path.resolve(sourcePath);

    let relativePath = slash(path.relative(sourcePath, absolutePath));

    // if file is located in the same folder
    if (relativePath.indexOf('../') !== 0) {
      relativePath = './' + relativePath;
    }

    // if the entry has a slash, keep it
    if (importPath[importPath.length - 1] === '/') {
      relativePath += '/';
    }

    return relativePath;
  }

  if (typeof importPath === 'string') {
    return importPath;
  }

  throw new Error('ERROR: No path passed');
};
