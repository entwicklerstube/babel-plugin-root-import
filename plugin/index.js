import BabelRootImportHelper from './helper';

export default function() {
  class BabelRootImport {
    constructor() {
      return {
        'visitor': {
          ImportDeclaration(path, state) {
            const defaultPath = path.node.source.value;

            let rootPathSuffix = '';
            let rootPathPrefix = '~';

            if (state && state.opts) {
              if (state.opts.rootPathSuffix && typeof state.opts.rootPathSuffix === 'string') {
                rootPathSuffix = `/${state.opts.rootPathSuffix.replace(/^(\/)|(\/)$/g, '')}`;
              }

              if (state.opts.rootPathPrefix !== undefined) {
                rootPathPrefix = state.opts.rootPathPrefix;
              }
            }

            if (BabelRootImportHelper().hasRootPathPrefixInString(defaultPath, rootPathPrefix)) {
              path.node.source.value = BabelRootImportHelper().transformRelativeToRootPath(defaultPath, rootPathSuffix, rootPathPrefix);
            }
          }
        }
      };
    }
  }

  return new BabelRootImport();
}
