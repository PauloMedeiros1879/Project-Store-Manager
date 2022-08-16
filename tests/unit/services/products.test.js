const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

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

    it('Testa se o retorno é um array com objetos', async () => {
        const res = await productsService.productsAll();

        expect(res).an('array');
      });
  });
});