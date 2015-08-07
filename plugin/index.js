export default function create(babel) {

  class BabelRootImport {

    foo = 'asd';

    constructor() {
      console.log('constructor');
    }

    transformRelativeToRootImport() {
      return '';
    }
  }

  return BabelRootImport;
}
