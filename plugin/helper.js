import slash from 'slash';
import path from 'path';
const defaultRoot = slash(global.rootPath || process.cwd());

export const hasRootPathPrefixInString = (importPath, rootPathPrefix = '~') => {
  return !!(
    typeof importPath === 'string' && importPath.indexOf(rootPathPrefix) === 0
  );
};

export const transformRelativeToRootPath = (
  importPath,
  rootPathSuffix,
  rootPathPrefix,
  _sourceFile = '',
  _root = defaultRoot,
) => {
  const sourceFile = slash(_sourceFile);
  if (hasRootPathPrefixInString(importPath, rootPathPrefix)) {
    const withoutRootPathPrefix = importPath.replace(rootPathPrefix, '');

    const suffix = rootPathSuffix ? rootPathSuffix : './';
    const root = typeof _root === 'function' ? _root(sourceFile) : _root;
    const absolutePath = path.resolve(root, `${suffix}/${withoutRootPathPrefix}`);

    let sourcePath = sourceFile.substring(0, sourceFile.lastIndexOf('/'));

    let relativePath = path.relative(path.resolve(sourcePath), absolutePath).replace(/\\/g, '/');

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
