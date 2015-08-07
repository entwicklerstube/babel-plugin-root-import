export default function create(babel) {

  class BabelRootImport {

    root = root_path || process.cwd();

    constructor() {
      if(babel) {
        return new babel.Transformer('babel-root-import', {
          ImportDeclaration: (node, parent) => {
            const givenPath = node.source.value;

            if(this.hasTildeInString(givenPath)) {
              node.source.value = this.transformRelativeToRootPath(node.source.value);
            }

            return node;
          }
        });
      }
    }

    transformRelativeToRootPath(path) {
      let transformedPath;

      if(this.hasTildeInString(path)) {
        const withoutTilde = path.substring(2, path.length);
        return `${this.root}/${withoutTilde}`;
      }

      return '123';
    }

    hasTildeInString(string) {
      let containsTilde = false;

      if(typeof string === 'string') {
        const firstTwoCharactersOfString = string.substring(0, 2);
        if(firstTwoCharactersOfString === '~/') {
          containsTilde = true;
        }
      }

      return containsTilde;
    }
  }

  return new BabelRootImport();
}
