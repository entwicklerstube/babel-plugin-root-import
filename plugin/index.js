import BabelRootImportHelper from './helper';

export default function({ types: t }) {
  class BabelRootImport {
    constructor() {
      const that = this;
      return {
        visitor: {
          ImportDeclaration(path, state) {
            const givenPath = path.node.source.value;

            var rootPathSuffix = state && state.opts && typeof state.opts.rootPathSuffix === 'string' ? state.opts.rootPathSuffix : '';

            if(BabelRootImportHelper().startsWith(givenPath, '~/')) {
              path.node.source.value = BabelRootImportHelper().transformRelativeToRootPath(givenPath, state.file.opts.filename, rootPathSuffix);
            }
          }
        }
      };
    }
  }

  return new BabelRootImport();
}
