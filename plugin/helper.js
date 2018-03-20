import fs from 'fs';
import slash from 'slash';
import path from 'path';

const processRoot = slash(global.rootPath || process.cwd());
const roots = {};

export const hasRootPathPrefixInString = (importPath, rootPathPrefix = '~') => {
  let containsRootPathPrefix = false;

  if (typeof importPath === 'string') {
    if (importPath.substring(0, 1) === rootPathPrefix) {
      containsRootPathPrefix = true;
    }

    const firstTwoCharactersOfString = importPath.substring(0, 2);
    if (firstTwoCharactersOfString === `${rootPathPrefix}/`) {
      containsRootPathPrefix = true;
    }
  }

  return containsRootPathPrefix;
};

export const transformRelativeToRootPath = (importPath, rootPathSuffix, rootPathPrefix, sourceFile) => {
  let withoutRootPathPrefix = '';
  if (hasRootPathPrefixInString(importPath, rootPathPrefix)) {
    if (importPath.substring(0, 1) === '/') {
      withoutRootPathPrefix = importPath.substring(1, importPath.length);
    } else {
      withoutRootPathPrefix = importPath.substring(2, importPath.length);
    }

    let sourceDir = path.dirname(sourceFile)
    let root = findRoot(sourceDir)
    let absolutePath = slash(path.resolve(root, rootPathSuffix || './', withoutRootPathPrefix));
    let relativePath = slash(path.relative(sourceDir, absolutePath));

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

function findRoot(dirname)
{
  // if the root is already cached, return it
  let root = roots[dirname];
  if(root)
    return root;

  // search for the root
  while(true)
  {
    // if .babelrc exists here, then we found the root
    let brcpath = path.resolve(dirname, '.babelrc');
    if(fs.existsSync(brcpath))
    {
      roots[dirname] = dirname;
      return dirname;
    }

    // move to the parent directory, if it exists
    let nextdir = path.dirname(dirname);
    if(nextdir === dirname)
      return processRoot;
    dirname = nextdir;
  }
}
