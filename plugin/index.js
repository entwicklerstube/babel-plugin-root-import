import BabelRootImportHelper from './helper';

const replacePrefix = (path, opts = {}) => {
  let rootPathSuffix = '';
  let rootPathPrefix = '';

  if (opts.rootPathSuffix && typeof opts.rootPathSuffix === 'string') {
    rootPathSuffix = `/${opts.rootPathSuffix.replace(/^(\/)|(\/)$/g, '')}`;
  }

  if (opts.rootPathPrefix && typeof opts.rootPathPrefix === 'string') {
    rootPathPrefix = opts.rootPathPrefix;
  } else {
    rootPathPrefix = '~';
  }

  if (BabelRootImportHelper().hasRootPathPrefixInString(path, rootPathPrefix)) {
    return BabelRootImportHelper().transformRelativeToRootPath(path, rootPathSuffix, rootPathPrefix);
  }

  return path;
};

export default function({'types': t}) {
  class BabelRootImport {
    constructor() {
      return {
        'visitor': {
          CallExpression(path, state) {
            if (path.node.callee.name !== 'require') {
              return;
            }

            const args = path.node.arguments;
            if (!args.length) {
              return;
            }

            const firstArg = args[0];
            // If the require is `require('~/' + 'blah')` we can still change it
            if (t.isBinaryExpression(firstArg) && t.isStringLiteral(firstArg.left)) {
              firstArg.left.value = replacePrefix(firstArg.left.value, state.opts);
            } else if (t.isLiteral(firstArg)) {
              firstArg.value = replacePrefix(firstArg.value, state.opts);
            }
          },
          ImportDeclaration(path, state) {
            path.node.source.value = replacePrefix(path.node.source.value, state.opts);
          }
        }
      };
    }
  }

  return new BabelRootImport();
}
