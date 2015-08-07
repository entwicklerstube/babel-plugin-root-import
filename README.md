# Babel Root Import
Babel plugin to add the opportunity to use `import` with root based paths.

## Install
```
npm install babel-root-import
```

## Use
Add a `.babelrc` file and write:
```
{
  "plugins": [
      "babel-root-import"
  ]
}
```

## Example
```javascript
// Without Plugin
import SomeExample '../../../folder/file.js';

// Now
import SomeExample '~/folder/file.js';
```
