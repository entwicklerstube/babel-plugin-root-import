import {hasRootPathPrefixInString, transformRelativeToRootPath} from './helper';

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

  if (hasRootPathPrefixInString(path, rootPathPrefix)) {
    return transformRelativeToRootPath(path, rootPathSuffix, rootPathPrefix);
  }

  return path;
};

/**
 * Recursively traverses binary  expressions to find the first `StringLiteral` if any.
 * @param  {Object} t           Babel types
 * @param  {Node} arg           a Babel node
 * @return {StringLiteral?}
 */
const traverseExpression = (t, arg) => {
  if (t.isStringLiteral(arg)) {
    return arg;
  }

  if (t.isBinaryExpression(arg)) {
    return traverseExpression(t, arg.left);
  }

  return null;
};

export default ({'types': t}) => ({
  'visitor': {
    CallExpression(path, state) {
      if (path.node.callee.name !== 'require') {
        return;
      }

      const args = path.node.arguments;
      if (!args.length) {
        return;
      }

      const firstArg = traverseExpression(t, args[0]);

      if (firstArg) {
        firstArg.value = replacePrefix(firstArg.value, state.opts);
      }
    },
    ImportDeclaration(path, state) {
      path.node.source.value = replacePrefix(path.node.source.value, state.opts);
    }
  }
});
