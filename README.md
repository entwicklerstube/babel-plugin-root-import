# Babel Root Import
Babel plugin to add the opportunity to use `import` with root based paths.

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

## Example
```javascript
// Usually
import SomeExample from '../../../folder/file.js';

// With Babel-Root-Importer
import SomeExample from '~/folder/file.js';
```
