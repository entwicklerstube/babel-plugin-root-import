# Babel Root Import
Babel plugin to add the opportunity to use `import` with root based paths.

![](https://img.shields.io/badge/unicorn-approved-blue.svg)
![http://twada.mit-license.org/2014-2015](http://img.shields.io/badge/license-MIT-brightgreen.svg)
[![Build Status](https://travis-ci.org/michaelzoidl/babel-root-import.svg?branch=master)](https://travis-ci.org/michaelzoidl/babel-root-import)
[![Codacy Badge](https://img.shields.io/codacy/98f77bcc84964e67a2754e563b962d27.svg)](https://www.codacy.com/app/me_1438/both-io)
[![Dependency Status](https://david-dm.org/michaelzoidl/babel-root-import.svg)](https://david-dm.org/michaelzoidl/babel-root-import)
[![devDependency Status](https://david-dm.org/michaelzoidl/babel-root-import/dev-status.svg)](https://david-dm.org/michaelzoidl/babel-root-import#info=devDependencies)

## Example
```javascript
// Usually
import SomeExample from '../../../some/example.js';

// With Babel-Root-Importer
import SomeExample from '~/some/example.js';
```

## Install
```
npm install babel-root-import --save-dev
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
babel-node myfile.js --plugins babel-root-import
```

Thanks [brigand](https://github.com/brigand) for giving me some [inspiration](http://stackoverflow.com/a/31069137/1624739)
