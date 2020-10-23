Babel plugin to add the opportunity to use `import` and `require` with root based
paths.<br>
[![Build Status](https://travis-ci.org/entwicklerstube/babel-plugin-root-import.svg?branch=master)](https://travis-ci.org/entwicklerstube/babel-plugin-root-import)
[![Dependency Status](https://david-dm.org/entwicklerstube/babel-plugin-root-import.svg)](https://david-dm.org/entwicklerstube/babel-plugin-root-import)
[![https://github.com/entwicklerstube/babel-plugin-root-import](https://img.shields.io/npm/dm/babel-plugin-root-import.svg)](https://www.npmjs.com/package/babel-plugin-root-import)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6f0e0cfda7214cd99ed22bb05ca2783e)](https://app.codacy.com/app/michaelzoidl/babel-plugin-root-import?utm_source=github.com&utm_medium=referral&utm_content=entwicklerstube/babel-plugin-root-import&utm_campaign=Badge_Grade_Dashboard)

## Example

```javascript
// Without this plugin...
import SomeExample from '../../../some/example.js';
const OtherExample = require('../../../other/example.js');
import('../../../other/dynamic').then((mod) => {
  // ...
});

// With babel-plugin-root-import you can write...
import SomeExample from '~/some/example.js';
const OtherExample = require('~/other/example.js');
import('~/other/dynamic').then((mod) => {
  // ...
});
```

## Install

Install with your package manager of choice.

```sh
npm install babel-plugin-root-import --save-dev
```

or

```sh
yarn add babel-plugin-root-import --dev
```

## Use

Add it to your plugins array in your babel config, e.g. a `.babelrc` file.

```javascript
{
  "plugins": [
    ["babel-plugin-root-import"]
  ]
}
```

For recent react-native versions, add it as a plugin in `babel.config.js`:

```js
module.exports = (api) => {
  api.cache(true);

  return {
    plugins: ['babel-plugin-root-import'],
  };
};
```

For the rest of this readme, it's implied that you'll configure the plugin as above
when using react-native.

## Config

You can configure this plugin by changing the string plugin name to a two-item array.
Note that this array is nested inside the plugins array. Here's an example with the
default config.

```javascript
  "plugins": [
    [
      "babel-plugin-root-import",
      {
        "rootPathSuffix": "./",
        "rootPathPrefix": "~/"
      }
    ]
  ],
```

Multiple rules may be specified by creating an object with
`{ "paths": [firstItem, secondItem] }`, e.g.

```javascript
  "plugins": [
    [
      "babel-plugin-root-import",
      {
        "paths": [
          {
            "rootPathSuffix": "./src/components",
            "rootPathPrefix": "~/"
          },
          {
            "rootPathSuffix": "./src/utils",
            "rootPathPrefix": "!/"
          },
        ]
      }
    ]
  ],
```

### Custom rootPathSuffix

By default, the import will be relative to the working directory of the process
running babel. Typically this means you'll have import paths like `~/src/foo.js`. You
can change the prefix of `"./"` to e.g. `"src"` or `"src/js"` with this config option.

```javascript
{
  "plugins": [
    ["babel-plugin-root-import", {
      "rootPathSuffix": "src/js"
    }]
  ]
}
```

The paths `"src/js"` and `"./src/js"` behave the same.

### Custom rootPathPrefix

If you don't like the `~` syntax you can use your own symbol (for example an `#`
symbol or `\` or anything you want). Using `@` is not recommended as NPM allows `@` in
package names. `~` is the default since it's very unlikely to conflict with anything
(and wouldn't be expanded to HOME anyway).

```javascript
{
  "plugins": [
    ["babel-plugin-root-import", {
      "rootPathPrefix": "#/"
    }]
  ]
}

// Now you can use the plugin like this
import foo from '#/my-file';
```

If you set it to e.g. `"#/"` then it'll require the slash in the import path.

### Custom root

By default everything is resolved relative to the current working directory. You can
change this with the `root` config option. To use it effectively, you'll need to
configure babel with one of the JavaScript config file variants, rather than JSON.

For example, the following `.babelrc.js` file causes imports to resolve relative to
the directory `.babelrc.js` is in.

```js
const rootImportOpts = {
  root: __dirname,
  rootPathPrefix: '~/',
  rootPathSuffix: 'src/js',
};

module.exports = {
  plugins: [['babel-plugin-root-import', rootImportOpts]],
};
```

<details>

<summary>

`babel.config.js`

</summary>

```js
const rootImportOpts = {
  root: __dirname,
  rootPathPrefix: '~/',
  rootPathSuffix: 'src/js',
};

module.exports = (api) => {
  api.cache(true);

  const plugins = [['babel-plugin-root-import', rootImportOpts]];

  return { plugins };
};
```

</details>

<details>

<summary>

Function root variant

</summary>

This `.babelrc.js` aliases `@/foo` to `./internals/foo.js` since it's always relative
to the file doing the import (contrived example).

```js
const rootImportOpts = {
  root: (sourcePath) => path.dirname(sourcePath),
  rootPathPrefix: '@/',
  rootPathSuffix: 'internals',
};

module.exports = {
  plugins: [['babel-plugin-root-import', rootImportOpts]],
};
```

</details>

### Transform paths for custom functions

If you have the need to transform paths also for other function calls you can
configure them. But please be aware that this is kind of error prone because custom
function names in Javascript are not static and can differ.

```javascript
{
  "plugins": [
    ["babel-plugin-root-import", {
      "functions": ["jest.mock"]
    }]
  ]
}

// Now you can use the plugin also for jest.mock calls:
jest.mock('~/myfile')
```

### Don't let ESLint be confused

If you use [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
to validate imports it may be necessary to instruct ESLint to parse root imports. You
can use
[eslint-import-resolver-babel-plugin-root-import](https://github.com/unconfident/eslint-import-resolver-babel-plugin-root-import)

```json
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {}
    }
  }
```

You may also specify a prefix/suffix if it doesn't correctly find your babel config.

```json
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {
        "rootPathPrefix": "~",
        "rootPathSuffix": "src"
      }
    }
  }
```

### Don't let Flow be confused

If you use Facebook's [Flow](https://flowtype.org/) for type-checking it is necessary
to instruct it on how to map your chosen prefix to the root directory. Add the
following to your `.flowconfig` file, replacing `{rootPathPrefix}` with your chosen
prefix (minus a trailing slash if any) and `{rootPathSuffix}` with your chosen suffix.

```
[options]
module.name_mapper='^{rootPathPrefix}/\(.*\)$' -> '<PROJECT_ROOT>/{rootPathSuffix}/\1'
```

### Don't let VSCode be confused

For features like go-to-definition, VSCode needs to be able to resolve
`require`/`import` paths to files on disk. This only works with one `rootPathSuffix`,
but you may define multiple `rootPathPrefix` entries.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "{rootPathPrefix}/*": ["src/*"]
    }
  }
}
```

For example, with `~/x/y.js` -> `./src/x/y.js`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

## FYI

Webpack delivers a similar feature, if you just want to prevent end-less import
strings you can also define `aliases` in the `resolve` module, at the moment it
doesn't support custom/different symbols and multiple/custom suffixes.
[READ MORE](http://xabikos.com/2015/10/03/Webpack-aliases-and-relative-paths/)

### Want to revert back to relative paths?

Sometimes tooling might not be up to scratch, meaning you lose features such as
navigation in your IDE. In such cases you might want to revert back to using relative
paths again. If you have a significant amount of files, it might be worth looking into
[tooling](https://www.npmjs.com/package/convert-root-import) to help you with the
conversion.
