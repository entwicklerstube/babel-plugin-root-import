import BabelRootImportPlugin from '../plugin';

describe('Babel Root Import', () => {
  let babelRootImportPlugin, plugin;

  beforeEach(() => {
    babelRootImportPlugin = BabelRootImportPlugin();
    plugin = new babelRootImportPlugin();
  });

  describe('transformRelativeToRootImport', () => {
    it('returns a string', () => {
      const func = plugin.transformRelativeToRootImport();
      expect(func).to.be.a('string');
    });
  });
});
