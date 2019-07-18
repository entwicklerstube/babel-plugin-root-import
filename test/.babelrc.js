const presets = [];

if (process.env.BABEL_VERSION === '7') {
  presets.push('@babel/env');
} else {
  presets.push('es2015', 'stage-1');
}

module.exports = { presets, plugins };
