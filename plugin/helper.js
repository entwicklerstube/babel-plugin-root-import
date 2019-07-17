import slash from 'slash';
import path from 'path';
const defaultRoot = slash(global.rootPath || process.cwd());

export const hasRootPathPrefixInString = (importPath, rootPathPrefix = '~') => {
  return !!(typeof importPath === 'string' && importPath.indexOf(rootPathPrefix) === 0);
};

export const transformRelativeToRootPath = (importPath, rootPathSuffix, rootPathPrefix, sourceFile = '', root = defaultRoot) => {
  if (hasRootPathPrefixInString(importPath, rootPathPrefix)) {
    const withoutRootPathPrefix = importPath.replace(rootPathPrefix, '');

    const suffix = rootPathSuffix ? rootPathSuffix : './';
    if (typeof root === 'function') {
      root = root(sourceFile);
    }
    const absolutePath = path.resolve(root, `${suffix}/${withoutRootPathPrefix}`);

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
