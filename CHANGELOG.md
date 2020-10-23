### 6.4.1 - 2019-07-18

- Fix Unicode paths on Windows

### 6.4.0 - 2019-07-18

- Add support for `require.resolve`
- Add support for configuring additional require-like functions

### 6.3.0 - 2019-07-17

- Add 'root' config option.

### 6.2.0 - 2019-05-09

- Remove the 2 characters restriction

### 6.1.0 - 2018-06-23

- Support Babel 7

### 5.0.0 - 2017-02-10

- More consistent name: babel-plugin-root-import
  [#63](https://github.com/entwicklerstube/babel-plugin-root-import/issues/63)
- Rename everything
- Publish with new name on [npm](babel-plugin-root-import)

### 4.1.5 - 2016-11-17

- Compile new version and release again

### 4.1.4 - 2016-11-15

- Improve support for relative paths (e.g. referencing parent folders via ../) (thanks
  to [@Hizoul](https://github.com/hizoul))

### 4.1.3 - 2016-09-14

- Support paths (thanks to [@sivael](https://github.com/sivael))

### 4.1.0 - 2016-08-20

- Use relative paths instead of absolute ones (thanks to
  [@nescalante](https://github.com/nescalante))

### 4.0.0 - 2016-06-29

- Almost everything changed, thanks to [@sheepsteak](https://github.com/sheepsteak),
  [@gingur](https://github.com/gingur), [@olalonde](https://github.com/olalonde)

### 3.2.2 - 2016-02-20

- Fix custom suffix in path, missing `/` in generated paths

### 3.2.0 - 2016-02-19

- Support
  [Windows-Filesystem](http://superuser.com/questions/176388/why-does-windows-use-backslashes-for-paths-and-unix-forward-slashes/176395#176395)
- Add possibility to configure a custom rootPath-Symbol (instead of `~` you can use
  whatever you like)

### 3.1.0 - 2015-12-01

- Add possibility to configure the custom root path

### 3.0.1 - 2015-11-30

- Update plugin to new Babel 6 API
- Split tests and functions into two scopes with single tests
- Remove the "extra-root" param for the .babelrc since this is no yet supported in
  Babel 6

### 2.0.1 - 2015-11-15

**Breaking Change to Babel 5**

- Updated to Babel 6
- Added integration tests

### 1.0.1 - 2015-08-07

- Add/update tests
- Implement ESLint
