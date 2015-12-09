import BabelRootImportHelper from './helper';

export default function({ types: t }) {
  class BabelRootImport {
    constructor() {
      const that = this;
      return {
        visitor: {
          ImportDeclaration(path, state) {
            const givenPath = path.node.source.value;

            var rootPathSuffix = state && state.opts && typeof state.opts.rootPathSuffix === 'string' ?
            '/' + state.opts.rootPathSuffix.replace(/^(\/)|(\/)$/g, '') :
                '';

            if(BabelRootImportHelper().hasTildeInString(givenPath)) {
              path.node.source.value = BabelRootImportHelper().transformRelativeToRootPath(givenPath, rootPathSuffix);
            }
          }
        }
      };
    }
  }

  return new BabelRootImport();
}
