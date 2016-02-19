import path from 'path';

import chai from 'chai';
import sinon from 'sinon';

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;

const originalPathSep = path.sep;

console.log(typeof process.env.WINDOWS_TEST);

global.setupPath = function () {
  if (process.env.WINDOWS_TEST === 'true') {
    path.sep = '\\';
  }
};

global.resetPath = function () {
  path.sep = originalPathSep;
};
