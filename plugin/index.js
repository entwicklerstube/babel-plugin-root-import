import BabelRootImportHelper from './helper';

export default function({ types: t }) {
  class BabelRootImport {
    constructor() {
      const that = this;
      return {
        visitor: {
          ImportDeclaration(path) {
            const givenPath = path.node.source.value;
            if(BabelRootImportHelper().hasTildeInString(givenPath)) {
              path.node.source.value = BabelRootImportHelper().transformRelativeToRootPath(path.node.source.value);
            }
          }
        }
      };
    }
  }

  return new BabelRootImport();
}
