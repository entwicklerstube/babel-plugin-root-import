var dirname = require('path').dirname;
var relative = require('path').relative;
var findPkg = require('find-pkg');

export default function() {
  class BabelRootImportHelper {

    root = global.rootPath || process.cwd()

    transformRelativeToRootPath(path, filePath, rootPathSuffix = '') {
      const fileBase = dirname(filePath);
      if (this.startsWith(path, '~/')) {
        const withoutTilde = path.substring(2, path.length);
        if (this.startsWith(rootPathSuffix, '%/')) {
          const suffix = rootPathSuffix.substring(1, rootPathSuffix.length);
          const localRoot = dirname(findPkg.sync(filePath));
          return './' + relative(fileBase, `${localRoot}${suffix}/${withoutTilde}`);
        }
        const suffix = '/' + rootPathSuffix.replace(/^(\/)|(\/)$/g, '');
        return './' + relative(fileBase, `${this.root}${suffix}/${withoutTilde}`);
      }
      if (typeof path === 'string') {
        return path;
      }
      throw new Error('ERROR: No path passed');
    }

    startsWith(string, target) {
      let startsWithTarget = false;

      if (typeof string === 'string') {
        const firstCharactersOfString = string.substring(0, target.length);
        if (firstCharactersOfString === target) {
          startsWithTarget = true;
        }
      }

      return startsWithTarget;
    }
  }

  return new BabelRootImportHelper();
}
