let babelTypes;
let parseToBody;
let importSyntaxPlugin;
let babelTransform;

if (process.env.BABEL_VERSION === '7') {
  const babel = require('@babel/core');
  babelTypes = require('@babel/types');
  importSyntaxPlugin = '@babel/plugin-syntax-dynamic-import';
  parseToBody = (code, opts = {}) => babel.parse(code, opts).program.body;
  babelTransform = babel.transform;
} else {
  const babel = require('babel-core');
  babelTypes = require('babel-types');
  importSyntaxPlugin = 'syntax-dynamic-import';
  parseToBody = (code, opts = {}) =>
    babel.transform(code, { ast: true, code: false, ...opts }).ast.program.body;
  babelTransform = babel.transform;
}

module.exports.babelTypes = babelTypes;
module.exports.parseToBody = parseToBody;
module.exports.importSyntaxPlugin = importSyntaxPlugin;
module.exports.babelTransform = babelTransform;
