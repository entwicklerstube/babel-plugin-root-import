import path from 'path';
import root from 'app-root-path';

export default function create(babel) {

  class BabelRootImport {

    root = root.path;

    constructor(babel) {
      // return new babel.Transformer("babel-plugin-project-relative-require", {
      //   ImportDeclaration: function(node, parent) {
      //
      //   };
      // };
    }

    transformRelativeToRootImport() {
      return '';
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

  return BabelRootImport;
}
