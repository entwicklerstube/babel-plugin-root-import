export default function create(babel) {
  class BabelRootImport {

    root = global.rootPath || process.cwd()

    constructor() {
      if (babel) {
        return new babel.Transformer('babel-root-import', {
          ImportDeclaration: (node) => {
            const givenPath = node.source.value;

            if (this.hasTildeInString(givenPath)) {
              node.source.value = this.transformRelativeToRootPath(node.source.value);
            }

            return node;
          }
        });
      }
    }

    transformRelativeToRootPath(path) {
      if (this.hasTildeInString(path)) {
        const withoutTilde = path.substring(2, path.length);
        return `${this.root}/${withoutTilde}`;
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

  return new BabelRootImport();
}
