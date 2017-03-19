import {hasRootPathPrefixInString, transformRelativeToRootPath} from './helper';

const replacePrefix = (path, opts = [], sourceFile) => {
  const options = [].concat(opts);

  for (let i = 0; i < options.length; i++) {
    let rootPathSuffix = '';
    let rootPathPrefix = '';
    const option = options[i];

    if (option.rootPathSuffix && typeof option.rootPathSuffix === 'string') {
      rootPathSuffix = option.rootPathSuffix;
    }
    if (option.rootPathPrefix && typeof option.rootPathPrefix === 'string') {
      rootPathPrefix = option.rootPathPrefix;
    } else {
      rootPathPrefix = '~';
    }

    if (hasRootPathPrefixInString(path, rootPathPrefix)) {
      return transformRelativeToRootPath(path, rootPathSuffix, rootPathPrefix, sourceFile);
    }
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

export default ({ 'types': t }) => {
  const visitor = {
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
        firstArg.value = replacePrefix(firstArg.value, state.opts, state.file.opts.filename);
      }
    },
    ImportDeclaration(path, state) {
      path.node.source.value = replacePrefix(path.node.source.value, state.opts, state.file.opts.filename);
    },
    ExportNamedDeclaration(path, state) {
      if (path.node.source) {
        path.node.source.value = replacePrefix(path.node.source.value, state.opts, state.file.opts.filename);
      }
    },
    ExportAllDeclaration(path, state) {
      if (path.node.source) {
        path.node.source.value = replacePrefix(path.node.source.value, state.opts, state.file.opts.filename);
      }
    }
  };
  return {
    'visitor': {
      Program(path, state) {
        path.traverse(visitor, state);
      }
    }
  };
};
