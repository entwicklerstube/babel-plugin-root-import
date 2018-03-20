'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformRelativeToRootPath = exports.hasRootPathPrefixInString = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processRoot = (0, _slash2.default)(global.rootPath || process.cwd());
var roots = {};

var hasRootPathPrefixInString = exports.hasRootPathPrefixInString = function hasRootPathPrefixInString(importPath) {
  var rootPathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '~';

  var containsRootPathPrefix = false;

  if (typeof importPath === 'string') {
    if (importPath.substring(0, 1) === rootPathPrefix) {
      containsRootPathPrefix = true;
    }

    var firstTwoCharactersOfString = importPath.substring(0, 2);
    if (firstTwoCharactersOfString === rootPathPrefix + '/') {
      containsRootPathPrefix = true;
    }
  }

  return containsRootPathPrefix;
};

var transformRelativeToRootPath = exports.transformRelativeToRootPath = function transformRelativeToRootPath(importPath, rootPathSuffix, rootPathPrefix, sourceFile) {
  var withoutRootPathPrefix = '';
  if (hasRootPathPrefixInString(importPath, rootPathPrefix)) {
    if (importPath.substring(0, 1) === '/') {
      withoutRootPathPrefix = importPath.substring(1, importPath.length);
    } else {
      withoutRootPathPrefix = importPath.substring(2, importPath.length);
    }

    var sourceDir = _path2.default.dirname(sourceFile);
    var root = findRoot(sourceDir);
    var absolutePath = (0, _slash2.default)(_path2.default.resolve(root, rootPathSuffix || './', withoutRootPathPrefix));
    var relativePath = (0, _slash2.default)(_path2.default.relative(sourceDir, absolutePath));

    // if file is located in the same folder
    if (relativePath.indexOf('../') !== 0) {
      relativePath = './' + relativePath;
    }

    // if the entry has a slash, keep it
    if (importPath[importPath.length - 1] === '/') {
      relativePath += '/';
    }

    return relativePath;
  }

  if (typeof importPath === 'string') {
    return importPath;
  }

  throw new Error('ERROR: No path passed');
};

function findRoot(dirname) {
  // if the root is already cached, return it
  var root = roots[dirname];
  if (root) return root;

  // search for the root
  while (true) {
    // if .babelrc exists here, then we found the root
    var brcpath = _path2.default.resolve(dirname, '.babelrc');
    if (_fs2.default.existsSync(brcpath)) {
      roots[dirname] = dirname;
      return dirname;
    }

    // move to the parent directory, if it exists
    var nextdir = _path2.default.dirname(dirname);
    if (nextdir === dirname) return processRoot;
    dirname = nextdir;
  }
}