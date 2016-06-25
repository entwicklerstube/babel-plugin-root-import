import slash from 'slash';

const root = slash(global.rootPath || process.cwd());

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

export const transformRelativeToRootPath = (importPath, rootPathSuffix, rootPathPrefix) => {
  let withoutRootPathPrefix = '';
  if (hasRootPathPrefixInString(importPath, rootPathPrefix)) {
    if (importPath.substring(0, 1) === '/') {
      withoutRootPathPrefix = importPath.substring(1, importPath.length);
    } else {
      withoutRootPathPrefix = importPath.substring(2, importPath.length);
    }
    return slash(`${root}${rootPathSuffix ? rootPathSuffix : ''}/${withoutRootPathPrefix}`);
  }

  if (typeof importPath === 'string') {
    return importPath;
  }

  throw new Error('ERROR: No path passed');
};
