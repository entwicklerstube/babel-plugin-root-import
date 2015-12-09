export default function(path) {
  class BabelRootImportHelper {

    root = global.rootPath || process.cwd()

    transformRelativeToRootPath(path, rootPathSuffix) {
      if (this.hasTildeInString(path)) {
        const withoutTilde = path.substring(2, path.length);
        return `${this.root}${rootPathSuffix ? rootPathSuffix : ''}/${withoutTilde}`;
      }
      if (typeof path === 'string') {
        return path;
      }
      throw new Error('ERROR: No path passed');
    }

    hasTildeInString(string) {
      let containsTilde = false;

      if (typeof string === 'string') {
        const firstTwoCharactersOfString = string.substring(0, 2);
        if (firstTwoCharactersOfString === '~/') {
          containsTilde = true;
        }
      }

      return containsTilde;
    }
  }

  return new BabelRootImportHelper();
}
