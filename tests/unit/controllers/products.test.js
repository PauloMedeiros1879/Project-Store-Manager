const sinon = require('sinon');
const productsService = require('../../../services/products');

describe('Testa productsAll de products da camada Controllers', () => {
  describe('Testa productsAll de products da camada Controllers, quando são retornados todos os produtos', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    beforeEach(async () => {
      sinon.stub(productsService, 'productsAll').resolves(products);
    });

    afterEach(async () => {
      productsService.productsAll.restore();
    });
  });
});