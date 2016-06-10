import slash from 'slash';
import resolve from 'resolve';

export default function() {
  class BabelRootImportHelper {

    root = slash(global.rootPath || process.cwd());

    transformRelativeToRootPath(importPath, rootPathSuffix, rootPathPrefix = '~') {
      let withoutRootPathPrefix = '';
      if (this.hasRootPathPrefixInString(importPath, rootPathPrefix)) {
        if (!rootPathPrefix) {
          try {
            if (resolve.sync(importPath, { 'basedir': this.root })) {
              return importPath;
            }
          } catch (e) {
            withoutRootPathPrefix = importPath;
          }
        } else if (importPath.substring(0, 1) === '/') {
          withoutRootPathPrefix = importPath.substring(1, importPath.length);
        } else {
          withoutRootPathPrefix = importPath.substring(2, importPath.length);
        }
        return slash(`${this.root}${rootPathSuffix ? rootPathSuffix : ''}/${withoutRootPathPrefix}`);
      }

      if (typeof importPath === 'string') {
        return importPath;
      }

      throw new Error('ERROR: No path passed');
    }

    hasRootPathPrefixInString(importPath, rootPathPrefix = '~') {
      if (typeof importPath === 'string') {
        const firstChar = importPath.substring(0, 1);
        if (!rootPathPrefix && firstChar !== '.' && firstChar !== '/') {
          return true;
        }

        if (firstChar === rootPathPrefix) {
          return true;
        }
      }

      return false;
    }
  }

  return new BabelRootImportHelper();
}
