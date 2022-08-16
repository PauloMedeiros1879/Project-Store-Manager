const sinon = require('sinon');
const productsModel = require('../../../models/products');


describe('Testa productsAll de products da camada Services', () => {
  describe('Testa productsAll, quando são listados todos os produtos do banco de dados', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    before(async () => {
      sinon.stub(productsModel, 'productsAll').resolves(products);
    });

    after(async () => {
      productsModel.productsAll.restore();
    });
  });
});