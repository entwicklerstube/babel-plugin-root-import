import { babelTypes, parseToBody, importSyntaxPlugin } from './babel-helpers';
import CallExpressionTester from '../plugin/call-expression-tester';

describe('CallExpressionTester', () => {
  describe('options', () => {
    it('should use require and require.resolve per default', () => {
      const tester = new CallExpressionTester({}, {});

      expect(tester.simpleFunctions).to.eql(['require']);
      expect(tester.memberFunctions).to.eql(['require.resolve']);
    });

    it('should consume functions options', () => {
      const tester = new CallExpressionTester(
        {},
        {
          functions: [
            'customFunctionWithResolvedPaths',
            'jest.mock',
            'invalid.with.parts',
          ],
        },
      );

      expect(tester.simpleFunctions).to.eql([
        'require',
        'customFunctionWithResolvedPaths',
      ]);
      expect(tester.memberFunctions).to.eql(['require.resolve', 'jest.mock']);
    });
  });

  describe('path testing', () => {
    const tester = new CallExpressionTester(babelTypes, {
      functions: ['specifiedCustomFunction', 'jest.mock'],
    });

    it('should accept require', () => {
      const parsed = parseToBody('var test = require("~/my/import")');
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.true;
    });

    it('should accept specifiedCustomFunction', () => {
      const parsed = parseToBody('var test = specifiedCustomFunction("~/my/import")');
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.true;
    });

    it('should deny another function', () => {
      const parsed = parseToBody('var test = someFunction("~/my/import")');
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.false;
    });

    it('should accept import()', () => {
      const parsed = parseToBody('var test = import("~/my/import")', {
        plugins: [importSyntaxPlugin],
      });
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.true;
    });

    it('should accept require.resolve', () => {
      const parsed = parseToBody('var test = require.resolve("~/my/import")');
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.true;
    });

    it('should deny defined property methods', () => {
      const parsed = parseToBody('var test = jest.mock("~/my/import")');
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.true;
    });

    it('should deny other property for resolve', () => {
      const parsed = parseToBody('var test = require.other("~/my/import")');
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.false;
    });

    it('should deny other property of defined object', () => {
      const parsed = parseToBody('var test = jest.other("~/my/import")');
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.false;
    });

    it('should deny defined property on other object', () => {
      const parsed = parseToBody('var test = other.mock("~/my/import")');
      const path = { node: parsed[0].declarations[0].init };

      expect(tester.test(path)).to.be.false;
    });
  });
});
