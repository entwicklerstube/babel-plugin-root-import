# Babel Root Import
Babel plugin to add the opportunity to use `import` with root based paths.

![](https://img.shields.io/badge/unicorn-approved-blue.svg)
[![Gratipay](http://img.shields.io/gratipay/michaelzoidl.svg)](https://gratipay.com/michaelzoidl/)
[![Build Status](https://travis-ci.org/michaelzoidl/babel-root-import.svg?branch=master)](https://travis-ci.org/michaelzoidl/babel-root-import)
[![bitHound Score](https://www.bithound.io/github/michaelzoidl/babel-root-import/badges/score.svg)](https://www.bithound.io/github/michaelzoidl/babel-root-import)
[![Codacy Badge](https://img.shields.io/codacy/98f77bcc84964e67a2754e563b962d27.svg)](https://www.codacy.com/app/me_1438/both-io)
[![devDependency Status](https://david-dm.org/michaelzoidl/babel-root-import/dev-status.svg)](https://david-dm.org/michaelzoidl/babel-root-import#info=devDependencies)

## Install
```
npm install babel-root-import
```

## Use
Add a `.babelrc` file and write:
```javascript
{
  "plugins": [
      "babel-root-import"
  ]
}
```
or pass the plugin with the plugins-flag on CLI
```
babel --plugins babel-root-import
```

## Example
```javascript
// Usually
import SomeExample from '../../../some/example.js';

// With Babel-Root-Importer
import SomeExample from '~/some/example.js';
```

### Thanks
Thanks [brigand](https://github.com/brigand) for giving me the [inspiration](http://stackoverflow.com/a/31069137/1624739) to realize this project.
