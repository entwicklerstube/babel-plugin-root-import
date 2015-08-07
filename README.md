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
