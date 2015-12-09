# Babel Root Import
Babel plugin to add the opportunity to use `import` with root based paths.<br>
[![Build Status](https://travis-ci.org/michaelzoidl/babel-root-import.svg?branch=master)](https://travis-ci.org/michaelzoidl/babel-root-import)
[![Codacy Badge](https://img.shields.io/codacy/98f77bcc84964e67a2754e563b962d27.svg)](https://www.codacy.com/app/me_1438/both-io)
[![Dependency Status](https://david-dm.org/michaelzoidl/babel-root-import.svg)](https://david-dm.org/michaelzoidl/babel-root-import)
[![devDependency Status](https://david-dm.org/michaelzoidl/babel-root-import/dev-status.svg)](https://david-dm.org/michaelzoidl/babel-root-import#info=devDependencies)
[![https://github.com/michaelzoidl/babel-root-import](https://img.shields.io/npm/dm/babel-root-import.svg)](https://www.npmjs.com/package/babel-root-import)

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

## Extras
If you want a custom root because for example all your files are in the src/js folder you can define this in your `.babelrc` file
```javascript
{
  "plugins": [
    ["babel-root-import", {
      "rootPathSuffix": "src/js"
    }]
  ]
}
```

## Motivate
If you like this project just give it a star :) I like stars.

## Change Log
#### 3.1.0 - 2015-12-01
- Add possibility config the custom root path

#### 3.0.1 - 2015-11-30
- Updated plugin to new babel6 API
- Splitted tests and functions into two scopes with single tests
- Removed the "extra-root" param for the .babelrc since this is no yet supported in babel6

#### 2.0.1 - 2015-11-15
Breaking Change to Babel 5
- Updated to Babel 6
- Added integration tests

#### 1.0.1 - 2015-08-07
- Added / updated tests
- Implemented ESlint
