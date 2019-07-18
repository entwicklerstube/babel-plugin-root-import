export default class CallExpressionTester {
  constructor(babelTypes, options) {
    this.types = babelTypes;
    this.simpleFunctions = ['require'];
    this.memberFunctions = ['require.resolve'];

    if ('functions' in options) {
      options.functions.forEach((func) => {
        const parts = func.split('.');
        if (parts.length === 1) {
          this.simpleFunctions.push(func);
        } else if (parts.length === 2) {
          this.memberFunctions.push(func);
        }
      });
    }
  }

  test(path) {
    const {
      node: { callee },
    } = path;

    if (
      this.types.isIdentifier(callee) &&
      this.simpleFunctions.includes(callee.name)
    ) {
      return true;
    }

    if (this.types.isImport(callee)) {
      return true;
    }

    return (
      this.types.isMemberExpression(path.node.callee) &&
      this.memberFunctions.includes(`${callee.object.name}.${callee.property.name}`)
    );
  }
}
